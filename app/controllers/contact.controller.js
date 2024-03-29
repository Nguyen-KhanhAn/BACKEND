const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.create = (req, res) => {
    res.send({message: "create handler"});
};

exports.findALL = (req, res) =>{
    res.send({message:"findALL handler"});
};

exports.findOne = (req, res) =>{
    res.send({message:"findOne handler"});
};

exports.update = (req, res) =>{
    res.send({message:"Update handler"});
};

exports.delete = (req, res) =>{
    res.send({message:"delete handler"});
};

exports.deleteALL = (req, res) =>{
    res.send({message:"deletedALL handler"});
};

exports.findALLFavorite = (req, res) =>{
    res.send({message:" findALLFavorite handler"});
};

// Create and save a new contact
exports.create = async (req, res, next) => {

    
    if (!req.body?.name) {
      return next(new ApiError(400, "Name is required"));
    }
  
    try {
      
      const contactService = new ContactService(MongoDB.client);
  
      
      const document = await contactService.create(req.body);
  
      
      return res.send(document);
    } catch (error) {
    
      return next(
        new ApiError(500, "An error occurred while creating contact")
        );
    }
  };
  
// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];
  
    try {
      const contactService = new ContactService(MongoDB.client);
  
      const { name = "" } = req.query;
  
      if (name) {
        documents = await contactService.findByName(name);
      } else {
        documents = await contactService.find({});
      }
    } catch (error) {
      return next(new ApiError(500, "Lỗi xảy ra khi lấy danh bạ"));
    }
  
    return res.send(documents);
  };
  
// Find a single contact with an id
exports.findOne = async (req, res, next) => {
    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.findById(req.params.id);
  
      if (!document) {
        return next(new ApiError(404, "Contact not found"));
      }
  
      return res.send(document);
    } catch (error) {
      return next(
        new ApiError(
          500,
          `Error retrieving contact with id=${req.params.id}`
        )
      );
    }

// Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu cập nhật không thể rỗng"));
    }
  
    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.update(req.params.id, req.body);
  
      if (!document) {
        return next(new ApiError(404, "Contact not found"));
      }
  
      return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
      return next(
        new ApiError(
            500,
            `Error updating contact with id=${req.params.id}`
            )
      );
    }
  };

// Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
      const contactService = new ContactService(MongoDB.client);
  
      const document = await contactService.delete(req.params.id);
      if (!document) {
        return next(new ApiError(404, "Contact not found"));
      }
  
      return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
      return next(
        new ApiError(
          500,
          `Could not delete contact with id=${req.params.id}`
        )
      );
    }
  };

// Tìm tất cả các liên hệ yêu thích của người dùng
exports.findAllFavorite = async (req, res, next) => {
    try {
      
      const contactService = new ContactService(MongoDB.client);
  
      
      const documents = await contactService.findFavorite();
  
      
      return res.send(documents);
    } catch (error) {
      
      return next(
        new ApiError(
            500,
             "An error occurred while retrieving favorite contacts"
             )
        );
    }
  };
    
// Xóa tất cả danh bạ của người dùng khỏi cơ sở dữ liệu
exports.deleteAll = async (req, res, next) => {
    try {
      const contactService = new ContactService(MongoDB.client);
  
      const deletedCount = await contactService.deleteAll();
  
      return res.send({
        message: `${deletedCount} contacts were deleted successfully`,
      });
    } catch (error) {
      return next(new ApiError(500, "An error occurred while removing all contacts")
      );
    }
  };
  
  };
  
