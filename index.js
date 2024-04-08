const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());


let mockData = [
    {
        taskId: 1,
        taskName: "520362 (SE)",
        taskDescription: "เขียน sequence diagram และ class diagram จากโจทย์ที่อาจารย์ให้ โดยใช้ program power designer จากนั้น generate report มา *** อย่าลืมแก้ไขให้เป็นชื่อตนเองด้วย *** ส่งทาง email เดิม ภายใน 23.59 น.",
        date: '4/6/2024',
        // month/day/year
    },
    {
        taskId: 2,
        taskName: "Cloud",
        taskDescription: "ทำแบบฝึกหัด 10 Module ใน AWS Academy",
        date: '4/6/2024',

    },
    {
        taskId: 3,
        taskName: "Research Method",
        taskDescription: "5 เรื่องจาก IEEE explorer ขอให้เป็นเรื่องที่เกี่ยวข้องกัน นำมาเขียนรายงาน และบรรณานุกรม แบบ IEEE (สรุปเรื่องละ 3-5 บรรทัด)",
        date: '4/6/2024',
    },
    {
        taskId: 4,
        taskName: "ย้ายกลุ่มเรียน Intensive Course",
        taskDescription: "",
        date: '4/6/2024',
    },
    {
        taskId: 5,
        taskName: "ลงทะเบียน summer 3/66",
        taskDescription: "",
        date: '4/8/2024',
    },
    {
        taskId: 6,
        taskName: "ลงทะเบียน summer 3/66",
        taskDescription: "",
        date: '4/9/2024',
    },
    {
        taskId: 7,
        taskName: "517324",
        taskDescription: "ทำแอพ และเรียกใช้ api ด้วย",
        date: '4/10/2024',
    },
    {
        taskId: 8,
        taskName: "ลงทะเบียน summer 3/66",
        taskDescription: "",
        date: '4/10/2024',
    },
    {
        taskId: 9,
        taskName: "เปิดเทอม summer 3/66",
        taskDescription: "",
        date: '4/17/2024',
    },
    {
        taskId: 10,
        taskName: "ถอนติด W",
        taskDescription: "ส่งเอกสารที่กองบริหารวิชาการ",
        date: '4/24/2024',
    }
   

]



// app.get('/showtasksall', (req, res) => {
//     res.json(mockData)
// })
 // get กำหนด path (เลือกส่งข้อมูลที่ตรงกับ date ที่รับมา)
app.get('/showtasks', (req, res) => {
    const selectedDate = req.query.date; // Extract selected date from query parameters
    const filteredTasks = mockData.filter(task => task.date === selectedDate); // Filter tasks based on selected date
    res.json(filteredTasks); // Return filtered tasks in the response
});   

// เพิ่ม New Task ลง mockData
app.post('/showtasks', (req, res) => {
    let newTask = {
        // เพิ่มข้อมูลอะไรบ้าง 
        taskId: mockData.length + 1,
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        date: req.body.date,
    }
    mockData.push(newTask);
    res.status(201).json(newTask)
})

// แก้ไข Task โดย ระบุ taskId ของงานที่จะถูกแก้ไข 
app.put('/showtasks/:taskId', (req, res) => {
            // (number) -> (String)
    let tId = +req.params.taskId
    let updateTask = {
        taskId: tId,
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        date: req.body.date,
        // เปลี่ยนแปลงอะไรบ้าง
    }
// ค้นหา index ของงานที่ต้องการแก้ไขใน mockData ด้วย findIndex() แทนที่ข้อมูลใน mockData ที่ index นั้นด้วยข้อมูลใหม่   
    let index = mockData.findIndex(task => task.taskId === tId);

    if (index !== -1) {
        mockData[index] = updateTask
        req.json(updateTask);
    } else {
        res.status(404).send('Task not found');
    }
})

// ระบุ taskId ของงานที่จะถูกลบ ออกจาก mockData
app.delete('/showtasks/:taskId', (req, res) => {
    let tId = +req.params.taskId
    //ใช้ findIndex() ค้นหา index งานต้องการลบใน mockData หากพบว่า taskId ที่ต้องการลบอยู่ใน mockData จะทำการใช้ splice() เพื่อลบงานที่ต้องการออกจาก mockData
    let index = mockData.findIndex(task => task.taskId === tId);
    if(index !== -1){               // ลบข้อมูลที่อยู่ใน mockData ที่ตำแหน่ง index ออกจาก array โดยลบออกไป 1 รายการเท่านั้น 
        let deleteTask = mockData.splice(index, 1);  // mockData[index] ที่ถูกลบไป ถูกส่งกลับเป็นค่าของ deleteTask
        res.json(deleteTask[0]);
    }else {
        res.status(404).send('Task not found');
    }    

})

app.listen(3000, () => console.log("Server started"))