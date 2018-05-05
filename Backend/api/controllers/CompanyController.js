// Names : Ahmed Akram , Youssef khayat
var mongoose = require('mongoose'),
moment = require('moment'),
Validations = require('../utils/Validations'),
Company = mongoose.model('Company');
/* Methods : getCompanyById,IncrementViews,getCompanies,getCompanies,createCompany,deleteCompany,viewCompanies,viewCompany
Date Edited : 5/5/2018
*/
module.exports.getCompanyById = function(req, res, next) { // Views a specific company after checking the ID then making a mongoose query
if (!Validations.isObjectId(req.params.companyId)) {
    return res.status(422).json({
        err: null,
        msg: 'companyId parameter must be a valid ObjectId.',
        data: null
    });
}
Company.findById(req.params.companyId).exec(function(err, company) {
    if (err) {
        return next(err);
    }
    if (!company) {
        return res
            .status(404)
            .json({ err: null, msg: 'Company not found.', data: null });
    }
    res.status(200).json({
        err: null,
        msg: 'Company retrieved successfully.',
        data: company
    });
});
};
module.exports.IncrementViews = function(req,res,next){ // Increase the views of companies by 1 each time a company is visited
var valid = req.params.ID && Validations.isObjectId(req.params.ID) 
if(!valid){
return res
.status(404)
.json({ err: null, msg: 'Company not found.', data: null });

}
else{
Company.findByIdAndUpdate(req.params.ID,
{
    $inc: {views : 1}
},
{ new: true }
).exec(function(err,updatedCompany){
    if(err){
        return next(err);
    }else if(!updatedCompany){
        return res
        .status(404)
        .json({ err: null, msg: 'Company not found.', data: null });
    }else{
        return res.status(201).json({ err: null, msg: 'Updated Views', data: updatedCompany })
    }
});
}
}


module.exports.getCompanies = function(req, res, next) { // View a list of companies that is availble to all users by issung a mongoose find request
Company.find({}).exec(function(err, companies) {
    if (err) {
        return next(err);
    }
    res.status(200).json({
        err: null,
        msg: 'Companies retrieved successfully.',
        data: companies
    });
});
};

module.exports.createCompany = function(req, res, next) { // Check all input fields required to make a company then issue a mongoose create to add to the company table
var valid =
    req.body.userid &&
    Validations.isObjectId(req.body.userid) &&
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.email &&
    Validations.isString(req.body.email) &&
    req.body.website &&
    Validations.isString(req.body.website)&&
    req.body.tags &&
    Validations.isString(req.body.tags)&&
    req.body.type &&
    Validations.isString(req.body.type)
;
if (!valid) {
    return res.status(422).json({
        err: null,
        msg: 'name(String) , email(String) , website(String) , tags(String) and type(String) are required fields.',
        data: null
    });
}
// Security Check
delete req.body.createdAt;
delete req.body.updatedAt;

Company.create(req.body, function(err, company) {
    if (err) {
        return next(err);
    }
    res.status(201).json({
        err: null,
        msg: 'Company was created successfully.',
        data: company
    });
});
};

module.exports.deleteCompany = function(req, res, next) { // Remove a company from the company table after checking the ID is a valid ID
if (!Validations.isObjectId(req.params.companyId)) {
    return res.status(422).json({
        err: null,
        msg: 'CompanyId parameter must be a valid ObjectId.',
        data: null
    });
}
Company.findByIdAndRemove(req.params.companyId).exec(function(
    err,
    deletedCompany
) {
    if (err) {
        return next(err);
    }
    if (!deletedCompany) {
        return res
            .status(404)
            .json({ err: null, msg: 'Company not found.', data: null });
    }
    res.status(200).json({
        err: null,
        msg: 'Company was deleted successfully.',
        data: deletedCompany
    });
});
};

module.exports.viewCompanies = function(req, res, next) { // View a list of companies that is availble to all users by issung a mongoose find request
Company.find({}).exec(function(err, Companys) {
  if (err) {
    return next(err);
  }
  res.status(200).json({
    err: null,
    msg: 'Companys retrieved successfully.',
    data: Companys
  });
});
};


module.exports.viewCompany = function(req, res, next) { // Views a specific company after checking the ID then making a mongoose query
if (!Validations.isObjectId(req.params.companyId)) {
  return res.status(422).json({
    err: null,
    msg: 'CompanyId parameter must be a valid ObjectId.',
    data: null
  });
}
Company.findById(req.params.companyId).exec(function(err, Company) {
  if (err) {
    return next(err);
  }
  if (!Company) {
    return res
      .status(404)
      .json({ err: null, msg: 'Company not found.', data: null });
  }
  res.status(200).json({
    err: null,
    msg: 'Company retrieved successfully.',
    data: Company
  });
});
};
