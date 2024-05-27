const students = [];

document.getElementById("formSinhVien").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    const hoTen = document.getElementById("hoTen").value;
    const maSV = document.getElementById("maSV").value;
    const ngaySinh = document.getElementById("ngaySinh").value;
    const lop = document.getElementById("lop").value;

    const action = event.submitter.innerText.toLowerCase();

    if (action === 'thêm') {
        addStudent({ hoTen, maSV, ngaySinh, lop });
    } else if (action === 'sửa') {
        editStudent({ hoTen, maSV, ngaySinh, lop });
    } else if (action === 'xóa') {
        deleteStudent(maSV);
    } else if (action === 'tìm kiếm') {
        searchStudent(maSV);
    }

    displayStudents();
    document.getElementById("formSinhVien").reset();
});

function addStudent(student) {
    students.push(student);
}

function editStudent(updatedStudent) {
    const index = students.findIndex(student => student.maSV === updatedStudent.maSV);
    if (index !== -1) {
        students[index] = updatedStudent;
    } else {
        alert("Sinh viên không tồn tại.");
    }
}

function deleteStudent(maSV) {
    const index = students.findIndex(student => student.maSV === maSV);
    if (index !== -1) {
        students.splice(index, 1);
    } else {
        alert("Sinh viên không tồn tại.");
    }
}

function searchStudent(maSV) {
    const student = students.find(student => student.maSV === maSV);
    if (student) {
        alert(`Tìm thấy sinh viên: \nHọ tên: ${student.hoTen}\nMã SV: ${student.maSV}\nNgày sinh: ${student.ngaySinh}\nLớp: ${student.lop}`);
    } else {
        alert("Không tìm thấy sinh viên.");
    }
}

function displayStudents() {
    const studentTable = document.getElementById("bangSinhVien").getElementsByTagName('tbody')[0];
    studentTable.innerHTML = ""; // Clear the table

    students.forEach(student => {
        const row = studentTable.insertRow();

        row.insertCell(0).innerText = student.hoTen;
        row.insertCell(1).innerText = student.maSV;
        row.insertCell(2).innerText = student.ngaySinh;
        row.insertCell(3).innerText = student.lop;
        
        const actionCell = row.insertCell(4);
        actionCell.innerHTML = `
            <button class="edit-btn bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">Sửa</button>
            <button class="delete-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Xóa</button>
        `;

        // Add event listeners to edit and delete buttons
        actionCell.querySelector('.edit-btn').addEventListener('click', () => {
            document.getElementById("hoTen").value = student.hoTen;
            document.getElementById("maSV").value = student.maSV;
            document.getElementById("ngaySinh").value = student.ngaySinh;
            document.getElementById("lop").value = student.lop;
        });

        actionCell.querySelector('.delete-btn').addEventListener('click', () => {
            deleteStudent(student.maSV);
            displayStudents();
        });
    });
}
