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
console.log(formSearch);
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