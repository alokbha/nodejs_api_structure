const pool = require('../config/db');
const { customSearchHelper } = require('../helpers/customSearchHelper');


exports.userOrderSearchModel = async (params) => {
    const {
        currentPage,
        pageSize,
        searchBy,
        searchFields,
        orderBy,
        orderDir
    } = params;

    // For manage the pagination setting offset
    const offset = (currentPage - 1) * pageSize;

    // Generate the search query using the helper
    const searchQuery = customSearchHelper(searchBy, searchFields);

    // Main query with SQL_CALC_FOUND_ROWS
    const query = `
        SELECT SQL_CALC_FOUND_ROWS 
        p.productId,
            p.productName,
            p.productImagesName,
            p.productImagesUrls,
            p.brandName,
            p.description,
            p.itemCode,
            p.itemType,
            p.currency,
            p.currencyCode,
            p.saleAmount,
            p.broshureFileName,
            p.broshureUrls AS brochureFileURL,
            p.vendors AS vendorInfo,
            p.status,
            p.createdBy,
            p.createdAt AS created,
            p.updatedAt AS updated,
            p.subCategoryId,
            p.categoryId,
            p.uomId,
            p.shipingMethodId,
            p.shippingTermId AS shippingTermsId,
            p.paymentTermId AS paymentTermsId,
            c.categoryName,
            sc.subCategoryName,
            u.code as uomCode,
            u.description as uomDescription,
            o.orgName as organisationName,
            o.organizationId as organizationId
        FROM ProductV2 p
        LEFT JOIN CategoryV2 c ON p.categoryId = c.categoryId
        LEFT JOIN SubCategoryV2 sc ON p.subCategoryId = sc.subCategoryId
        LEFT JOIN CustomerUOM u ON p.uomId = u.uomId
        LEFT JOIN Organizations o ON p.createdBy = o.organizationId
        ${searchQuery} 
        ORDER BY p.${orderBy} ${orderDir} 
        LIMIT ${pageSize} OFFSET ${offset}
    `;

    // Execute the main query
    const [rows] = await pool.query(query);

    // Query to fetch the total count
    const [[{ totalCounts }]] = await pool.query('SELECT FOUND_ROWS() AS totalCounts');

    console.log(totalCounts);

    return { rows, totalCounts };
};

