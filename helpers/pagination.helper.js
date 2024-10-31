module.exports.paginationHelper = (req, totalItems) => {
    const objectPagination = {
        currentPage: 1,
        limitItems: 4
    }

    if(req.query.page)
    {
        objectPagination.currentPage = parseInt(req.query.page);
    }

    if(req.query.limit)
    {
        objectPagination.limitItems = parseInt(req.query.limit);
    }

    objectPagination.totalPage = Math.ceil(totalItems / objectPagination.limitItems);

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    return objectPagination;
}