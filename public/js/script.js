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