module.exports.filterStatus = (req) => {
    const filterState = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    

    if(req.query["status"])
    {
        const index = filterState.findIndex(item => item.status === req.query.status);
        filterState[index].class = "active";
    }
    else
    {
        filterState[0].class = "active";
    }

    return filterState;
}