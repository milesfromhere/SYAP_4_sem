///Создать типы/интерфейсы для следующих массивов/объектов:
///1
interface Student {
    id: number;
    name: string;
    group: number;
}

const array: Student[] = [
    { id: 1, name: 'Vasya', group: 10 },
    { id: 2, name: 'Ivan', group: 11 },
    { id: 3, name: 'Masha', group: 12 },
    { id: 4, name: 'Petya', group: 10 },
    { id: 5, name: 'Kira', group: 11 },
];
console.log(JSON.stringify(array, null, 2));
///2
interface CarsType {
    manufacturer: string;
    model: string; 
};

const car: CarsType = {
    manufacturer: "manufacturer",
    model: 'model'
};
///3
interface ArrayCarsType {
    cars: CarsType[];
}

const car1: CarsType = {
    manufacturer: "manufacturer",
    model: 'model'
};

const car2: CarsType = {
    manufacturer: "manufacturer",
    model: 'model'
};

const arrayCars: ArrayCarsType[] = [{
    cars: [car1, car2]
}];

///4. Имеются следующие типы.
///Создать недостающие типы, необходимые структуры данных и дописать функции.
type MarkFilterType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type GroupFilterType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type DoneType = boolean;

type MarkType = {
    subject: string;
    mark: MarkFilterType; // может принимать значения от 1 до 10
    done: DoneType;
};

type StudentType = {
    id: number;
    name: string;
    group: GroupFilterType; // может принимать значения от 1 до 12
    marks: Array<MarkType>;
};

type GroupType = {
    students: StudentType[];
    studentsFilter: (group: GroupFilterType) => Array<StudentType>; 
    marksFilter: (mark: MarkFilterType) => Array<StudentType>; 
    deleteStudent: (id: number) => void; 
    mark: MarkFilterType;
    group: GroupFilterType;
};

const group: GroupType = {
    students: [
        { id: 1, name: 'Vasya', group: 10, marks: [{ subject: 'Math', mark: 8, done: true }] },
        { id: 2, name: 'Ivan', group: 11, marks: [{ subject: 'Math', mark: 5, done: false }] },
    ],
    studentsFilter: function (group: GroupFilterType) {
        return this.students.filter(student => student.group === group);
    },
    marksFilter: function (mark: MarkFilterType) {
        return this.students.filter(student => student.marks.some(m => m.mark === mark));
    },
    deleteStudent: function (id: number) {
        this.students = this.students.filter(student => student.id !== id);
    },
    mark: 8,
    group: 10,
};
console.log("- - - - - - - - - - - - - - - - - - - - - - - - - -");
console.log(JSON.stringify(group.studentsFilter(10), null, 2));
console.log(JSON.stringify(group.marksFilter(8), null, 2));
group.deleteStudent(1); 
console.log(JSON.stringify(group.students, null, 2));