import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const contactsPath = path.resolve("db", "contacts.json");
console.log(contactsPath);

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

export async function listContacts() {
  return await readContacts();
}

export async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts[index];
  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];
  await writeContacts(newContacts);
  return removedContact;
}

export async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

export async function updateContactById(contactId, contactData) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (typeof contact === "undefined") {
    return null;
  }
  const renewContacts = contacts.filter((contact) => contact.id !== contactId);
  const renewContact = {
    ...contact,
    ...contactData,
  };
  renewContacts.push(renewContact);
  writeContacts(renewContacts);
  return renewContact;
}
