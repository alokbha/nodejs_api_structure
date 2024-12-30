exports.customSearchHelper = (searchBy, searchFields) => {
    if (!searchBy || !searchFields.length) return '';
    const conditions = searchFields.map(field => `${field} LIKE '%${searchBy}%'`);
    return `WHERE ${conditions.join(' OR ')}`;
};