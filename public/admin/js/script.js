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