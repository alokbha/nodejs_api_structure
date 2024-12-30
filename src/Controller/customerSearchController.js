const { userOrderSearchModel } = require('../models/userOrderSeachModel');
exports.customerSearchController = async (req, res, next) => {
    try {
        const {
            currentPage = 1,
            pageSize = 10,
            orderBy = 'createdAt',
            orderDir = 'DESC',
            searchBy = "",
            searchFields = []
        } = req.query;
        const params = {
            currentPage : parseInt(currentPage, 10),
            pageSize : parseInt(pageSize, 10),
            orderBy,orderBy,
            orderDir:orderDir,
            searchBy:searchBy,
            searchFields:searchFields.length ? searchFields.split(',') : []
        };
        const { rows, totalCounts } = await userOrderSearchModel(params);
        console.log(totalCounts);
        const totalPages = Math.ceil(totalCounts/params.pageSize);
        res.status(200).json({
            currentPage: params.currentPage,
            pageSize: params.pageSize,
            totalPages,
            totalCounts,
            data: rows
        })
    }catch(error){
        next(error);
    }
}
