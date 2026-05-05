document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('menuModal');
    const openBtn = document.getElementById('openMenuModal');
    const closeBtn = document.getElementById('closeModal');
    const saveBtn = document.getElementById('saveMenu');
    const tableBody = document.querySelector('#menuTable tbody');
    const modalTitle = document.getElementById('modalTitle');

    let editRow = null; // Tracks if we are editing an existing row

    // 1. Open Modal for Adding
    openBtn.addEventListener('click', () => {
        editRow = null; 
        modalTitle.innerText = "Add New Menu";
        clearInputs();
        modal.style.display = 'block';
    });

    // 2. Close Modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        clearInputs();
    });

    // 3. Save Logic (Both Add and Edit)
    saveBtn.addEventListener('click', () => {
        const name = document.getElementById('foodName').value;
        const price = document.getElementById('foodPrice').value;
        const desc = document.getElementById('foodDesc').value;
        const day = document.getElementById('foodDay').value;
        const imageInput = document.getElementById('foodImageInput');

        if (!name || !price) {
            alert("Please enter Name and Price.");
            return;
        }

        // Process Image and Row
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgUrl = e.target.result;
                processSave(imgUrl, name, price, desc, day);
            }
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            // Use existing image if editing and no new image uploaded
            const existingImg = editRow ? editRow.cells[0].querySelector('img').src : null;
            processSave(existingImg, name, price, desc, day);
        }
    });

    function processSave(imgUrl, name, price, desc, day) {
        if (editRow) {
            // EDITING: Update existing cells
            if (imgUrl) editRow.cells[0].innerHTML = `<img src="${imgUrl}" class="product-img" style="width:60px; height:40px; object-fit:cover; border-radius:5px;">`;
            editRow.cells[1].innerText = price;
            editRow.cells[2].innerHTML = `<strong>${name}</strong><br><small>${desc}</small>`;
            editRow.cells[3].innerText = day;
        } else {
            // ADDING: Create new row
            const row = document.createElement('tr');
            const displayImg = imgUrl ? `<img src="${imgUrl}" class="product-img" style="width:60px; height:40px; object-fit:cover; border-radius:5px;">` : `<div style="width:60px; height:40px; background:#eee; border-radius:5px;"></div>`;

            row.innerHTML = `
                <td>${displayImg}</td>
                <td>${price}</td>
                <td><strong>${name}</strong><br><small>${desc}</small></td>
                <td>${day}</td>
                <td>
                    <button class="pill-btn edit-btn">Edit</button>
                    <button class="pill-btn delete-btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
            attachRowEvents(row);
        }
        modal.style.display = 'none';
        clearInputs();
    }

    function attachRowEvents(row) {
        // DELETE
        row.querySelector('.delete-btn').addEventListener('click', () => {
            if(confirm("Delete this item?")) row.remove();
        });

        // EDIT: Populate modal with row data
        row.querySelector('.edit-btn').addEventListener('click', () => {
            editRow = row;
            modalTitle.innerText = "Edit Menu Item";
            
            // Extract values from row to modal
            document.getElementById('foodName').value = row.cells[2].querySelector('strong').innerText;
            document.getElementById('foodPrice').value = row.cells[1].innerText;
            document.getElementById('foodDesc').value = row.cells[2].querySelector('small').innerText;
            document.getElementById('foodDay').value = row.cells[3].innerText;
            
            modal.style.display = 'block';
        });
    }

    function clearInputs() {
        document.getElementById('foodName').value = '';
        document.getElementById('foodPrice').value = '';
        document.getElementById('foodDesc').value = '';
        document.getElementById('foodDay').value = '';
        document.getElementById('foodImageInput').value = '';
    }
});