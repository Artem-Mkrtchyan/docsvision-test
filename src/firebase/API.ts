import { fetch, TAddInventory } from "../types/databaseType"
import firebase from "./firebaseInit"

export const firebaseAPI = {
  _db: firebase.firestore(),
  getPlaces() {
    return this._db.collection("places").get().then(response => {
      let docs = response.docs.map(place => ({
        id: place.id,
        name: place.data().name,
        parts: place.data().parts?.map(({ id }: { id: any }) => id),
      }))
      return docs
    })
  },

  getInventory() {
    return this._db.collection("inventory").get().then(response => {
      let docs = response.docs.map(inventory => ({
        id: inventory.id,
        data: inventory.data(),
        placeId: inventory.data().place ? inventory.data().place.id : 'Not found'
      }))
      return docs
    })
  },

  addInventory(data: TAddInventory) {
    let filestore = this._db
    return filestore.collection("inventory").doc().set({
      name: data.name,
      count: data.count,
      place: filestore.collection("places").doc(data.id)
    })
      .then(() => ({ status: fetch.success }))
      .catch(() => ({ status: fetch.error }))
  },

  deleteInventory(id: string) {
    return this._db.collection("inventory").doc(id).delete()
      .then(() => ({ status: fetch.success }))
      .catch(() => ({ status: fetch.error }))
  },
}

