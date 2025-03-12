// 1. Классы и ООП

abstract class BaseUser {
    constructor(public id: number, public name: string) { }
    abstract getRole(): string;
    abstract getPermissions(): string[];
}

class Guest extends BaseUser {
    getRole(): string {
        return "Guest";
    }
    getPermissions(): string[] {
        return ["view content"];
    }
}

class User extends BaseUser {
    getRole(): string {
        return "User";
    }
    getPermissions(): string[] {
        return ["view content", "comment"];
    }
}

class Admin extends BaseUser {
    getRole(): string {
        return "Admin";
    }
    getPermissions(): string[] {
        return ["view content", "comment", "delete comments", "manage users"];
    }
}

// 2. Полиморфизм и интерфейсы

interface IReport {
    title: string;
    content: string;
    generate(): string;
}

class HTMLReport implements IReport {
    constructor(public title: string, public content: string) { }
    generate(): string {
        return `<h1>${this.title}</h1><p>${this.content}</p>`;
    }
}

class JSONReport implements IReport {
    constructor(public title: string, public content: string) { }
    generate(): string {
        return JSON.stringify({ title: this.title, content: this.content });
    }
}

// 3. Дженерики

class DataCache<T> {
    private storage: Map<string, { value: T; expires: number }> = new Map();

    add(key: string, value: T, ttl: number): void {
        this.storage.set(key, { value, expires: Date.now() + ttl });
    }

    get(key: string): T | null {
        const entry = this.storage.get(key);
        if (!entry || entry.expires < Date.now()) {
            this.storage.delete(key);
            return null;
        }
        return entry.value;
    }

    clearExpired(): void {
        this.storage.forEach((entry, key) => {
            if (entry.expires < Date.now()) {
                this.storage.delete(key);
            }
        });
    }
}

function createInstance<T>(cls: new (...args: any[]) => T, ...args: any[]): T {
    return new cls(...args);
}

// 4. Кортежи и Enum

enum LogLevel {
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
}

type LogEntry = [Date, LogLevel, string];

function logEvent(event: LogEntry): void {
    console.log(`[${event[0].toISOString()}] ${event[1]}: ${event[2]}`);
}

enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    SERVER_ERROR = 500,
}

type ApiResponse<T> = [HttpStatus, T | null, string?];

function success<T>(data: T): ApiResponse<T> {
    return [HttpStatus.OK, data];
}

function error(message: string, status: HttpStatus): ApiResponse<null> {
    return [status, null, message];
}
