// ----------filter-------
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus)
{
    let url = new URL(window.location.href);
    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status)
            {
                url.searchParams.set("status", status);
            }
            else
            {
                url.searchParams.delete("status");
            }
            window.location.href = url
        })
    })
}
// -----------end filter--------- 

// -----------search-----------
const formSearch = document.querySelector("#form-search");
if(formSearch)
{
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        
        // const input = formSearch.querySelector('input[name="keyword"]');
        // const value = input.value;

        // const value = e.target.elements[0].value;

        const value = e.target.elements.keyword.value;

        if(value.trim())
        {
            url.searchParams.set("keyword", value);
        }
        else
        {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
// -----------end search-----------

// ---------pagination------------
const pagination = document.querySelector(".pagination");
if(pagination)
{
    const pageItems = pagination.querySelectorAll("[button-pagination]");
    const url = new URL(window.location.href);
    pageItems.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);

            window.location.href = url.href;
        });
    })
}
// ---------end pagination--------

// ---------change-status---------
const buttonsStatus = document.querySelectorAll("[button-change-status]");
if(buttonsStatus.length > 0)
{
    const formChangeStatus = document.querySelector("[form-change-status]");
    const path = formChangeStatus.getAttribute("path");
    buttonsStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            const statusChange = status == "active" ? "inactive" : "active";

            const action = `${path}/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
// ---------end change-status-----

// --------change-status-multi---------
const tableProduct = document.querySelector("[table-product]");
if(tableProduct)
{
    const checkAll = tableProduct.querySelector("[check-all]");
    const checkItems = tableProduct.querySelectorAll("[check-item]");
    console.log(checkAll.checked)

    checkAll.addEventListener("click", () => {
        if(checkAll.checked)
        {
            checkItems.forEach(item => {
                item.checked = true
            })
        }
        else
        {
            checkItems.forEach(item => {
                item.checked = false
            })
        }
    })

    checkItems.forEach(item => {
        item.addEventListener("click", () => {
            const countCheck = tableProduct.querySelectorAll("input[name='id']:checked").length;
            console.log(countCheck);
            if(countCheck == checkItems.length)
            {
                checkAll.checked = true;
            }
            else
            {
                checkAll.checked = false;
            }
        })  
    })
}


const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti)
{
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();

        const type = e.target.elements.type.value;
        if(type == "delete-all")
        {
            const isConfirm = confirm("Bạn có muốn xóa sản phẩm?");
            if(!isConfirm)
            {
                return;
            }
        }

        const inputIds = formChangeMulti.querySelector("input[name='ids']");
        const inputsChecked = tableProduct.querySelectorAll("input[name='id']:checked");
        if(inputsChecked.length > 0)
        {
            const ids = [];
            inputsChecked.forEach(item => {
                const id = item.getAttribute("data-id");
                const position = item.closest("tr").querySelector("input[name='position']").value;
                if(type == "change-position")
                {
                    ids.push(`${id}-${position}`);
                }
                else
                {
                    ids.push(id);
                }
            });
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        }
        else
        {
            alert("Bạn cần chọn sản phẩm!")
        }
    })
}

// --------end change-status-multi---------


// --------delete product-----------
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete.length > 0)
{
    const formDeleteProduct = document.querySelector("[form-delete-product]");
    const path = formDeleteProduct.getAttribute("path");
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const confirmDelete = confirm("Bạn muốn xóa sản phẩm?");
            if(confirmDelete)
            {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteProduct.action = action;
                formDeleteProduct.submit();
            }
        });
    })
}
// --------end delete product-------

// -------reset product---------
const buttonsBack = document.querySelectorAll("[button-back]");
if(buttonsBack.length > 0)
{
    const formBackProduct = document.querySelector("[form-back-product]");
    const path = formBackProduct.getAttribute("path");
    buttonsBack.forEach(button => {
        button.addEventListener("click", () => {
            const confirmBack = confirm("Bạn muốn ngừng xóa sản phẩm?");
            if(confirmBack)
            {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=PATCH`;
                formBackProduct.action = action;
                formBackProduct.submit();
            }
        });
    })
}
// -------end reset product---------
