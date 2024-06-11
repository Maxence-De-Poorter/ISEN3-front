// data.js
export const courses = [
    {
        id: '1',
        name: 'Ballet Basics',
        instructor: 'John Doe',
        schedule: 'Monday 6-8 PM',
        description: 'Introduction to ballet for beginners',
        capacity: 20,
        enrolled: 10,
    },
    {
        id: '2',
        name: 'Hip Hop Essentials',
        instructor: 'Jane Smith',
        schedule: 'Wednesday 7-9 PM',
        description: 'Learn the basics of Hip Hop',
        capacity: 25,
        enrolled: 20,
    },
    // Ajoutez plus de cours si nécessaire
];

export const enrollments = [
    {
        courseId: '1',
        userId: '123',
        enrollmentDate: '2024-06-01',
    },
    {
        courseId: '2',
        userId: '123',
        enrollmentDate: '2024-06-02',
    },
    // Ajoutez plus d'inscriptions si nécessaire
];
