import { app } from './firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { TInventoryResp, TPlace } from '../types/databaseType';

export const firebaseAPI = {
  _db: getFirestore(app),
  _snapshot(bdName: string) {
    const placesCol = collection(this._db, bdName);
    return getDocs(placesCol);
  },

  async getPlaces() {

    const placesSnapshot = await this._snapshot("places");
    const placesList: Array<TPlace> = placesSnapshot.docs.map(place => ({
      id: place.id,
      name: place.data().name,
      parts: place.data().parts?.map(({ id }: { id: any }) => id),
    }));

    return placesList;
  },

  async getInventory() {
    const inventorySnapshot = await this._snapshot("inventory");
    const inventoryList = inventorySnapshot.docs.map(inventory => {
      return({
      id: inventory.id,
      data: inventory.data(),
      placeId: inventory.data().place ? inventory.data().place.id : 'Not found'
    })});
    return inventoryList;
  },
}
