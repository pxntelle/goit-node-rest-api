// import {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContactById,
// } from "../services/contactsServices.js";
import Contact from "../collection/contactsModels.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await Contact.findByIdAndDelete(id);
    if (!removedContact) {
      throw HttpError(404);
    }
    res.status(200).json(removedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res) => {
  const contact = req.body;
  const createdContact = await Contact.create(req.body);
  if (!createdContact) {
    throw HttpError(400);
  }
  res.status(201).json(createdContact);
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const changeContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedContact) {
      throw new HttpError(404);
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const changeStatusContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!changeStatusContact) {
      throw HttpError(404);
    }
    res.status(200).json(changeStatusContact);
  } catch (error) {
    next(error);
  }
};
