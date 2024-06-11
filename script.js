getAllProduct();

function getAllProduct() {
    $.ajax({
        url: "http://localhost:8080/api/product",
        method: "get",
        
        success: function (data){
            console.log(data);
            let arrProduct = data.map((p,i,arr) =>{
                return `
                <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.status}</td>
                <td>${p.type.name}</td>
                <td>
                <a href="javascript:void(0)" onclick="showFormDelete(${p.id})">Delete</a>
                <a href="javascript:void(0)" onclick="showFormUpdate(${p.id})">Update</a>
                </td>
                </tr>
            `;
            });
            $("#tb-product").html(arrProduct.join(""));

        },
        error: function(jqXHR, status, e){
            console.log(e);
            
        }
    });
} 

function showProductByName() {
    let name = document.getElementById("search-product").value;
    console.log(name);

    $.ajax({
        url: "http://localhost:8080/api/product?name=" + name,
        method: "get",

        success: function(data){
            console.log(data);

            let arrProduct = data.map((p, i, arr) => {
                return `
                <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.status}</td>
                <td>${p.type.name}</td>
                <td>
                <button type="button" class="btn btn-danger"><a href="javascript:void(0)" onclick="showFormDelete(${p.id})">Delete</a></button>
                <button type="button" class="btn btn-secondary"><a href="javascript:void(0)" onclick="showFormUpdate(${p.id})">Update</a></button>
                </td>
             </tr>
                `;
            });
            $("#tb-product").html(arrProduct.join(""));
        
        },
    })
}

function showProductByType() {
    let id = document.getElementById("type-option").value;
    console.log(id);

    $.ajax({
        url: "http://localhost:8080/api/product/type/" + id,
        method: "get",

        success: function(data){
            console.log(data);

            let arrProduct = data.map((p, i, arr) => {
                return `
                <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.status}</td>
                <td>${p.type.name}</td>
                <td>
                <button type="button" class="btn btn-danger"><a href="javascript:void(0)" onclick="showFormDelete(${p.id})">Delete</a></button>
                <button type="button" class="btn btn-secondary"><a href="javascript:void(0)" onclick="showFormUpdate(${p.id})">Update</a></button>
                </td>
             </tr>
                `;
            });
            $("#tb-product").html(arrProduct.join(""));
        },
    })
}

function showFormCreate(){
    $("#form-create").show();
    $("#tb-head").hide();
}

function createNewProduct() {
    let name = $("#name").val()
    let price = $("#price").val()
    let status = $("#status").val()
    let type = $("#type").val()

    $.ajax({
        method: "post",
        url: "http://localhost:8080/api/product",
        contentType: "application/json",
        data: JSON.stringify({
            "name": name,
            "price": price,
            "status": status,
            "type": {
                "id": type
            }
    
        }),
        success: function (data) {
            console.log(data);
            console.log("Product added successfully. Redirecting to index.html", data);
            window.location.href = "index.html";
        },
        error: function(jqXHR, status, e){
            console.log(e);
        }
    });
}

function showFormUpdate(id) {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/api/product/" + id,
        success: function (data){
            $("#name-update").val(data.name);
            $("#price-update").val(data.price);
            $("#status-update").val(data.status);
            $("#type-update").val(data.type.id);
            $("#save-update-button").off("click").on("click", function() {
                updateProduct(id);
            });

            $("#form-update").show();
        }
    });
}

function updateProduct(id){
    let name = $("#name-update").val();
    let price = $("#price-update").val();
    let status = $("#status-update").val();
    let type = $("#type-update").val();

    $.ajax({
        type: "put",
        url: "http://localhost:8080/api/product/" + id,
        contentType: "application/json",
        data: JSON.stringify({
            "name": name,
            "price": price,
            "status": status,
            "type": {
                "id": type
            },
        }),
        success: function (){
            $("#form-update").hide();
            getAllProduct();
        }
    });
}

function showFormDelete(id){
    $.ajax({
        url: "http://localhost:8080/api/product/" + id,
        method: "get",
        
        success: function (data){
            console.log(data);
            $("#delete-product-info").html(`
                <strong>ID:</strong> ${data.id} <br>
                <strong>NAME:</strong> ${data.name} <br>
                <strong>PRICE:</strong> ${data.price} <br>
                <strong>STATUS:</strong> ${data.status} <br>
                <strong>TYPE:</strong> ${data.type.name} <br>
            `);

            $("#delete-confirmation").show();

            $("#confirm-delete-button").off("click").on("click", function() {
                confirmDelete(id);
            });

            $("#tb-head").hide();
        },
        
        error: function(jqXHR, status, e) {
            console.log(e);
        }
    });
}

function confirmDelete(id){
    console.log("Preparing to delete product with id:", id);

    $.ajax({
        url: "http://localhost:8080/api/product/" + id,
        method: "delete",
        
        success: function () {
            console.log("Product deleted successfully. Redirecting to index.html");
            window.location.href = "index.html"; 
        },
        error: function(jqXHR, status, e) {
            console.log("Error deleting customer:", e);
        }
    });
}