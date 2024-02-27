import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

interface Contact {
	id: string;
	createdAt: number;
}

// This essentially fakes network slowdown as well as a cache.
interface Cache {
	[key: string]: boolean;
}
let fakeCache: Cache;
async function fakeNetwork(key?: string) {
	if (!key) {
		fakeCache = {};
	} else {
		if (fakeCache[key]) {
			return;
		}
		fakeCache[key] = true;
	}

	return new Promise((res) => {
		setTimeout(res, Math.random() * 800);
	});
}

export async function getContacts(query?: string) {
	await fakeNetwork(`getContacts:${query}`);
	let contacts: Contact[] = (await localforage.getItem("contacts")) ?? [];
	if (query) {
		contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
	}
	return contacts.sort(sortBy("last", "createdAt"));
}

function set(contacts: Contact[]) {
	return localforage.setItem("contacts", contacts);
}

export async function createContact() {
	await fakeNetwork();
	// TODO: why not UUID? import that library!!
	const id: string = Math.random().toString(36).substring(2, 9);
	const contact: Contact = { id, createdAt: Date.now() };
	const contacts = await getContacts();
	contacts.unshift(contact);
	await set(contacts);
	return contact;
}

export async function getContact(id: string) {
	await fakeNetwork(`contact:${id}`);
	const contacts: Contact[] = (await localforage.getItem("contacts")) ?? [];
	const contact: Contact | undefined = contacts.find(
		(contact) => contact.id === id,
	);
	return contact ?? null;
}

export async function updateContact(id: string, updates: Contact) {
	await fakeNetwork();
	const contacts: Contact[] = (await localforage.getItem("contacts")) ?? [];
	const contact: Contact | undefined = contacts.find(
		(contact) => contact.id === id,
	);
	if (!contact) throw new Error(`No contact found for ${id}`);
	Object.assign(contact, updates);
	await set(contacts);
	return contact;
}

export async function deleteContact(id: string) {
	const contacts: Contact[] = (await localforage.getItem("contacts")) ?? [];
	const index = contacts.findIndex((contact) => contact.id === id);
	if (index > -1) {
		contacts.splice(index, 1);
		await set(contacts);
		return true;
	}
	return false;
}
