/**
 * Created by basti on 07.06.17.
 */
const imagesTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
const docTypes = ['application/pdf'];


export class KnownFiles {

  public static isKnownType(ft): boolean {
    if (ft.startsWith('image')) {
      return imagesTypes.includes(ft);
    }
    if (ft.startsWith('application') || ft.startsWith('text')) {
      return docTypes.includes(ft);
    }
    return false;
  }


  public static getImgTypes() {
    return imagesTypes.join(',');
  }

  public static getDocTypes() {
    return docTypes.join(',');
  }
}

