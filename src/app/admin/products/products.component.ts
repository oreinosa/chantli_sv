import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Table } from '../../shared/classes/table';
import { Product } from '../../shared/classes/product';
import { takeUntil, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../../shared/classes/category';
import { CategoriesService } from '../categories/categories.service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebaseApp from 'firebase/app';

https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FCsbzD2IBMHquhU7JyOzq.jpg?alt=media&token=42da824f-f947-46a0-9535-52ff08c91d54

const BACKUP: Product[] = [
  {
    "id": "qzBsyVzFjNHxbciTrTil",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FCsbzD2IBMHquhU7JyOzq.jpg?alt=media&token=42da824f-f947-46a0-9535-52ff08c91d54",
    "name": "Alambre de res"
  },
  {
    "id": "ZciMitkbHXr9UoL6aDen",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fm8jxoaU1uIWEnPpWTj3F.jpg?alt=media&token=ce4b78a8-c9f6-4ce6-958c-32922ed8bccb",
    "name": "Albóndigas de carne"
  },
  {
    "id": "Yp1vTt841ETvQjIgRBRj",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F9hxvMx6dVzjG2usMSnA4.jpg?alt=media&token=8d3d7d84-4a0c-4aa8-b246-001fe3899189",
    "name": "Alitas de pollo"
  },
  {
    "id": "gEOnsfqKwlfrzMrVNUAB",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FqsAFAr8DqaUr4MY3tG5M.jpg?alt=media&token=df5adcab-b817-4f76-883f-d21cbc0f4d79",
    "name": "Bistec de carne"
  },
  {
    "id": "lalIDfpmIaetxYnodmmW",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FsNw1uvvU9Xqo7rDWHGuP.jpg?alt=media&token=269bcdd8-99c5-4c9e-80b0-af1dcadbe62c",
    "name": "Canelones de pollo"
  },
  {
    "id": "mbZBRAr5BhH4ldFbDyD4",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fi4I55jKwNk4h9JO5R7c7.jpg?alt=media&token=ffc3e3fa-d651-4e8d-94e9-afce3b20c9b5",
    "name": "Canelones de res"
  },
  {
    "id": "pJeJk9r937774NffnufZ",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FZFyKK6m9M4GUQaaJSacD.jpg?alt=media&token=d27538dd-44d3-4ee7-be2c-c2c2bdf85ffd",
    "name": "Capeado de papa"
  },
  {
    "id": "xQoUAXX8AFoRw8X8S6FG",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FSraLZrpONJLNZoufeyzG.jpg?alt=media&token=308a6b80-9b28-475c-9599-db9fdf50a14b",
    "name": "Carne a la plancha"
  },
  {
    "id": "0xGoZ2b3P8jPGXrFMN8Y",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fdau18wvSpxINBeESkeZ8.jpg?alt=media&token=d17cb962-3cbb-49b2-b4f6-00f3331d3242",
    "name": "Carne asada con chorizo (1u)"
  },
  {
    "id": "S3t9gaNsjJFvvKLuxLWQ",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FOMacIaJ0Wa5qzBt0yZxT.jpg?alt=media&token=cb20675d-2f04-4d96-acb2-06b93f11d4f1",
    "name": "Carne deshilada"
  },
  {
    "id": "1GwLtiEqimhpyjFtjCEx",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FITL4ag7S3RlBPiHb8YWZ.jpg?alt=media&token=5b6d85ca-c7c8-4b04-a099-2aaa977c4973",
    "name": "Carne encebollada"
  },
  {
    "id": "pjvyibXVHxoymYavvKV9",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fm93IuDfqqwfxmjYAKFjf.jpg?alt=media&token=34a48f0f-edd5-48fc-8f42-7dd1cdfc27d8",
    "name": "Carne guisada"
  },
  {
    "id": "AEfqRVRCmdSGboUSWJPQ",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FHjJ86AAKEEeL9KqGTqkK.jpg?alt=media&token=956af500-ae0c-4b03-87c2-5655f774fd2f",
    "name": "Carne rellena"
  },
  {
    "id": "Ez9xnBrdjhomYAsU6eFB",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FGJXOJEVsPpiCNizX4aJI.jpg?alt=media&token=2c6ba3ad-5539-4b58-8d56-e5054e7fb410",
    "name": "Cerdo adobado"
  },
  {
    "id": "PecobivDEw1uhBtUyYD0",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FwquK8KDCHvS1GAga1387.jpg?alt=media&token=d467e5a6-a4d8-4c18-a543-540554a7a735",
    "name": "Chilaquilas con queso"
  },
  {
    "id": "FEjw2u5dSI5Ob8YdEqJ4",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FcqSCWD0izBm4RROhW0Qp.jpg?alt=media&token=df7b7904-c13d-44b1-b1ca-d6ffb9102b24",
    "name": "Chow mein"
  },
  {
    "id": "rtcVld7Nvp1Pbb9gznnS",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FhrJzZWXZEsOb8bQ7FJYG.jpg?alt=media&token=5edeb4f0-b677-4fb1-bd09-0f3fe75e4eae",
    "name": "Chuleta de cerdo"
  },
  {
    "id": "n9rSJB1EuGPRqw5kWHVE",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fd7QgRbpFB2Si3NNuE02m.jpg?alt=media&token=a656c07c-d5c6-4f30-86c9-af867315d6ff",
    "name": "Costilla de cerdo entomatada"
  },
  {
    "id": "HuSDr1nDkQrlVoY7PU3E",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F1OcA0EJJ3KeIoobti4I3.jpg?alt=media&token=152a1792-ee8a-44af-b056-f5fa7eca4c7e",
    "name": "Croquetas de carne"
  },
  {
    "id": "AgRWYdtgLh5WaPn90s4B",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FfoColA8qwlPA40XKSsN7.jpg?alt=media&token=22444349-6d05-4df7-a554-3fbf6b48267f",
    "name": "Enrollado de carne con verduras"
  },
  {
    "id": "Ed4QTM2oTAyLHGoDTna4",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FMI5QFNYJotvNg3ZNCHRQ.jpg?alt=media&token=dc581b77-7b30-4639-8fd4-2314c9d56ad0",
    "name": "Espaguetis a la boloñosa "
  },
  {
    "id": "RSgTU92W8j5VcqBKZEPL",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F8XyYjHzd9mwcncScY3MF.jpg?alt=media&token=58ab6aba-f245-4536-8b41-1ae43fdfb3d7",
    "name": "Espaguetis a la crema"
  },
  {
    "id": "y40mX8tbnK3vW14594Jq",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fcp9iWkZkgIVshVMXXrCW.jpg?alt=media&token=8d356b79-7e2f-4622-b658-ab552917a34f",
    "name": "Espaguetis con pollo"
  },
  {
    "id": "KZzHabo45925t8mHPOJv",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fxh5N1mPPRmBgVDwSoyzD.jpg?alt=media&token=e34083b2-64b9-4e75-80ad-a526b01640eb",
    "name": "Estofado de carne "
  },
  {
    "id": "zmwRMblw0rAHpu5rfhsG",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FbrGf4TE9OjGnWrWAWSCk.jpg?alt=media&token=4825fb1d-ca9b-4d2f-af28-6ae176c09e10",
    "name": "Fajitas de pollo"
  },
  {
    "id": "pX9WG0xwKsKVblHxqdla",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FGfACVDuLmeEaB0lrlupB.jpg?alt=media&token=00dcdbd6-efbe-4359-88c3-fecf558acabb",
    "name": "Fajitas de res"
  },
  {
    "id": "QcbvAlSLo29940N2zZUm",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FKIxqawbdpMb9ZG3MU3TO.jpg?alt=media&token=b660820f-2abc-46e0-b32a-7f9206c161db",
    "name": "Filete de res en salsa"
  },
  {
    "id": "DBiVXZEJRHAE8Cxvx7fa",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F0zJ2fwqs4LTtk0qOO9Zl.jpg?alt=media&token=b966ee28-9816-4ba0-b9e1-cc7f3b2ac1d1",
    "name": "Galiina Asada"
  },
  {
    "id": "PHlva6CMJreES8FVwxyy",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FebdN2YGFEI8rKZglyDpG.jpg?alt=media&token=dd134ea7-0b7a-4819-af19-6b6dfff177aa",
    "name": "Lasaña a la boloñesa"
  },
  {
    "id": "0Lqlpel1BrJvVuuErKR8",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FgCucC0mCuMI8fm8LWFuL.jpg?alt=media&token=243c64d4-3e47-4f49-b28b-579cb85cad14",
    "name": "Lasaña de pollo"
  },
  {
    "id": "SOEPs5VQ2wJ8Xc0vf1mr",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FNcjTEpMKTQisyKAiFeif.jpg?alt=media&token=cc696d07-ab5c-4a32-9606-3158ff8f5deb",
    "name": "Lomo de cerdo con ajonjolí "
  },
  {
    "id": "8w1UGUZVSI64JpGZLEoW",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FRKhlDBTrWhl9E2dTRIar.jpg?alt=media&token=ae4d5a2e-4937-43f6-b63c-61d13d181fec",
    "name": "Lomo de cerdo con semillas"
  },
  {
    "id": "k7Q0PrsJaRAvT1FTdj5F",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FUl1FrZrZNXHklgH6XzNB.jpg?alt=media&token=03edd85d-c528-4c7e-9f38-730e50882803",
    "name": "Lomo de cerdo en salsa barbacoa"
  },
  {
    "id": "MYBZtI7cZ4edKvsenP21",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F9lIqvnZ6QM8PiTx2Fs6P.jpg?alt=media&token=b00351a4-06b4-420d-a5f7-2a94bd90c443",
    "name": "Lomo de cerdo entomatado"
  },
  {
    "id": "gYHNrGuDQ13mkh1MuKUK",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F8C0TDUheLUcyJYeb0fCf.jpg?alt=media&token=25db51a1-6dfd-46e7-9fa3-2894fd95fea1",
    "name": "Lomo de cerdo horneado"
  },
  {
    "id": "5Z9TUcLz8hMOH567tVcZ",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FyumpvpT6AjNRd0Xen09g.jpg?alt=media&token=4aab0183-88d1-46b8-857f-3856a5d7ea71",
    "name": "Lomo de res en salsa de hongos"
  },
  {
    "id": "LFwXlAhrsM5OTdyy9ySL",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FhbEoBCTATZZuhBDDHyXJ.jpg?alt=media&token=aabf26be-5d07-4230-953f-3f1d9ed8cbe9",
    "name": "Lomo de res en salsa de hongos"
  },
  {
    "id": "gCNrFffKs47Ztuq63wi5",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FVkWuXCujLDgs4GSRuwKh.jpg?alt=media&token=f185ba04-ff31-4acd-b098-55c3d339f0bc",
    "name": "Lonja de pescado empanizada"
  },
  {
    "id": "dollThmrFWSsSajxQJm2",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FoU2oruyzRRgN09w7tO3Z.jpg?alt=media&token=3535ffc4-a38b-45a5-965a-aa0aca12a6f1",
    "name": "Media sopa de gallina con un cuarto de gallina asada"
  },
  {
    "id": "38qd8JCuVQ6XzGAHTkpU",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FFBHGxLI86nt84k6oSxOl.jpg?alt=media&token=0aacf712-3d6c-412c-ac91-bdf0b3cb41f5",
    "name": "Media sopa de tortilla con 2 tacos de pollo"
  },
  {
    "id": "KBvOGiPzdkGo0VikxNFa",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FUNF4v1RkLxOyeU9MHIQJ.jpg?alt=media&token=9905b636-1cf6-49f2-8974-7aa7ef74d954",
    "name": "Media sopa de tortilla con 2 tacos de res"
  },
  {
    "id": "TdbFB1wqEEWI0qoEEtyY",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FvyMrsExKZobQ9alJSVpg.jpg?alt=media&token=beb238f2-c1b4-43ec-b55e-32873002ecec",
    "name": "Pechiga de pollo en salsa alfredo"
  },
  {
    "id": "BemybJG4FaxEs2kgueoQ",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F2SrG1nFIWO2SqCubkgIS.jpg?alt=media&token=c3709afe-8da4-47a7-a285-47bcc49976f4",
    "name": "Pechuga de pollo al romero"
  },
  {
    "id": "E8OwU03C9JX171F2pAzb",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FMuWtJWPUQBARX2VgDksK.jpg?alt=media&token=e90ec771-fca4-4320-8d31-5af4e14f5545",
    "name": "Pechuga de pollo con loroco"
  },
  {
    "id": "xq4Ib6ag2mvk5qq8crG7",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FwqCGJNe9SnkzuXHYgS6p.jpg?alt=media&token=db95ff7e-c6d2-491a-8446-65169baff6db",
    "name": "Pechuga de pollo horneada"
  },
  {
    "id": "XCyiOqVmB6RGLUG6owXK",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FVgpVrpQWiOSldqvlOnZQ.jpg?alt=media&token=a85cdf67-464d-440e-a8ba-09b3b3fe3b0f",
    "name": "Pechuga de pollo rellena "
  },
  {
    "id": "eU7kX6twXfNBNk63CJfR",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F8zhRfZKeHRDdwseePyIz.jpg?alt=media&token=0cebc1bd-52d4-4103-95f4-68c70632a267",
    "name": "Pechuga de pollo rellena con espinaca"
  },
  {
    "id": "hatidGcy0NqTLG9UlI7a",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fk22Pi9zV3p4vWxrKaySA.jpg?alt=media&token=926ec98a-f87a-406d-b211-9cdc7d9682fe",
    "name": "Picado de carne con verduras"
  },
  {
    "id": "ANN06HWdYzPdHHjoGt0j",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FtPrhyyBlJ8RvdjehVpJC.jpg?alt=media&token=606cd4c8-0cfa-4080-b422-301c04092fee",
    "name": "Pollo Teriyaki"
  },
  {
    "id": "OjKrdLnw2poSTWSkqPcJ",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F83wtTxPWplbdiKn5gZDz.jpg?alt=media&token=4d607df3-31ba-4940-9c94-9c07242035a5",
    "name": "Pollo a la cantonesa"
  },
  {
    "id": "DoaW0lCBJ3nXJyibjGxs",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FzG0m8CVjBrPPBS3sZVQI.jpg?alt=media&token=bd6e5451-350a-4ecc-b261-d1c85f733cc0",
    "name": "Pollo a la crema"
  },
  {
    "id": "sIntS8HHs2EBNizSERyg",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FhWutgctzbvSLMBbGy7HW.jpg?alt=media&token=d29251df-4bd1-45ec-84be-114cadad65eb",
    "name": "Pollo a la crema con zukini"
  },
  {
    "id": "U4Fs8kvQkhXYYRLNC9NK",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FSTMCIb0G6IOOofV42NLS.jpg?alt=media&token=a8088038-22d1-40c7-ad0e-12d712edac08",
    "name": "Pollo a la crema de brocolí "
  },
  {
    "id": "mZoCKz5Vw4mqTVinq1hT",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FlUymWmblzDyVHUdlaiBs.jpg?alt=media&token=b2caddd6-1689-4e1a-8b45-dfee5ca932e3",
    "name": "Pollo a la naranja"
  },
  {
    "id": "jElHC4EVUCllxhWbnuej",
    "category": "Principal",
    "description": "6oz de pollo a la plancha.",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FkLkNTjSmPFYQO45sow67.jpg?alt=media&token=93ddd46d-de2d-4c3a-b369-f78cc375d31d",
    "name": "Pollo a la plancha"
  },
  {
    "id": "WL0eGCoF7KZqQczPCUlV",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FBglow9iGUUmuvJpqbJPc.jpg?alt=media&token=e414fa95-140e-4ecd-9f23-540302415adf",
    "name": "Pollo al ajio"
  },
  {
    "id": "IcQeesb0I11tFVBorN1m",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FLHP9bl7wpNb0CaxqQi2n.jpg?alt=media&token=d72c49d4-9356-4daa-bec4-541f4b52b508",
    "name": "Pollo con semillas"
  },
  {
    "id": "CNsB0f0MNezhXXxIZtk3",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FTtHSrsiCl3qzCFpJZKPu.jpg?alt=media&token=e71ddc12-bb8a-4a35-bf89-3e72aa1e0131",
    "name": "Pollo con verduras"
  },
  {
    "id": "QcCDdObhj7SbpAKemT57",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FQxVq5FqLDjXpe5Rfpja9.jpg?alt=media&token=94407d68-f887-4883-af80-15dd773e8661",
    "name": "Pollo deshilado"
  },
  {
    "id": "O8efRXCUlrj6oErlIf2H",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FDAaIij4xeQD8cAukFszu.jpg?alt=media&token=2bdd70a0-663d-46ec-97b3-0478962aff88",
    "name": "Pollo empanizado"
  },
  {
    "id": "12l0lT0gLXMsMUJ720GS",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F03Kz5fguMP4NVTI3WJvT.jpg?alt=media&token=ce42b44f-a6ca-4c6c-bb5b-b27130b55ccb",
    "name": "Pollo en crema"
  },
  {
    "id": "KvdEiciPjpROG9nTdxDv",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FdanHmRHzi0Dh1nqMoqkS.jpg?alt=media&token=c32e1c8e-b188-423a-abce-9e1358e2529b",
    "name": "Pollo en pasta alfredo"
  },
  {
    "id": "ZkGz6urnpNTUk1WlLdnC",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F6LdT4bjhWS9z6uo0yzgO.jpg?alt=media&token=19c21ca9-b849-4f73-a000-74e630bff2e8",
    "name": "Pollo en salsa Alfredo"
  },
  {
    "id": "SBIpTkAElYQUKWciKmCn",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FQf6j9QhypBT5e1CfWGMo.jpg?alt=media&token=969b5411-0792-42f8-94e2-bbf94c0af0c2",
    "name": "Pollo en salsa barbacoa"
  },
  {
    "id": "39IgmQHWHytVwwNsiMQP",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F3sZG9tAsUqiByZUgurm9.jpg?alt=media&token=381677d6-ad85-40fb-9ade-6c869dc0ff2c",
    "name": "Pollo en salsa de hongos"
  },
  {
    "id": "DVzNW8O9FcgzXYl7yjq3",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FtoZrQTyHSCkiC82Esc35.jpg?alt=media&token=98ea443c-ba28-4762-88e2-3641909cbcf9",
    "name": "Pollo en salsa de hongos"
  },
  {
    "id": "5t5A9rssune7kgMTvm11",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FfUA8HxmPRxQlNBpxOw1k.jpg?alt=media&token=c771e71a-bf06-4fb5-8b27-77c4f38d4bd8",
    "name": "Pollo en salsa de soya"
  },
  {
    "id": "l7z92G9ru2IIDTLtLAiQ",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F8xLHmKEplFmPBWzael5c.jpg?alt=media&token=390dfa82-b86e-4c79-b56e-797c323efb78",
    "name": "Pollo encebollado"
  },
  {
    "id": "dpzGFrANPwWjZvtMSaWQ",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fjb2KwPPcZ0TcF7tAMFrl.jpg?alt=media&token=6ebbbaa2-ef5e-4c50-97f1-459da2dec74b",
    "name": "Pollo guisado"
  },
  {
    "id": "uhET7iX5Jhz3gMsKWjLn",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FczLRLmfPUIA0NSxnkvS7.jpg?alt=media&token=4d54463c-7601-41de-8896-489776fded73",
    "name": "Pollo rostizado"
  },
  {
    "id": "YcGHf1o7iGGzKsaCdJXc",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F64lvgSR2kv88C4rFZlsj.jpg?alt=media&token=3a952d9d-a5b7-44b9-bde0-cc84cbfc0101",
    "name": "Relleno de Gûisquil "
  },
  {
    "id": "UxDFcXXYFaPph0MHzGCS",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FKtbVOrvYuy05sTQc6ges.jpg?alt=media&token=37e753e4-5880-4f4b-9f72-2f0ecb4fd784",
    "name": "Relleno de lonja fresca (NO pescado seco)"
  },
  {
    "id": "pjOnFJjVhnuPBxJShYpY",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FtojqEskbyc3Uxi6dbsqL.jpg?alt=media&token=4e48aba5-4e52-466e-b1fe-4bfc4136c64a",
    "name": "Relleno de papa"
  },
  {
    "id": "8EtKKQ7GOZoGt3iu3Pam",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fyj2ZnR8zDukAANKHVylJ.jpg?alt=media&token=b8247273-f956-403f-9866-03c439ee5a0c",
    "name": "Rollitos de carne con verduras "
  },
  {
    "id": "o5Jcq1GGQH6frxfzzwRv",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FOzat2AySMilH1s1sigLC.jpg?alt=media&token=0636b50b-9be6-4ab1-868e-5b16898752fc",
    "name": "Rollitos de pollo con verduras"
  },
  {
    "id": "OssTVd0kcBpt4DMnP4D9",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FnsQW95R2DpjSMiwp2BO6.jpg?alt=media&token=caa11d48-6486-4884-8f90-d40bcdf092a8",
    "name": "Salpicón "
  },
  {
    "id": "7HsjHdQkLBwwsSXyliCh",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FkKxEC3JnL33jnOq7Iyv1.jpg?alt=media&token=630cf9e4-dda9-4f57-a21c-59b27d273974",
    "name": "Sopa de frijoles con costilla de cerdo",
    "noSides": true
  },
  {
    "id": "4DFjJ7owGbVtZLxwk5Aq",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FswCtUB6CuYy5ssb4Oou2.jpg?alt=media&token=bc5636c1-3563-43b8-bec8-98b27f08b91b",
    "name": "Sopa de gallina"
  },
  {
    "id": "Qukg3voum08U0b7keZWd",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fjo8I8G6WrsPpfghiSnjS.jpg?alt=media&token=b5a9a663-2db0-47eb-9d01-1c1dccb37dcb",
    "name": "Sopa de pollo",
    "noSides": true
  },
  {
    "id": "jh37SjXFkdrPOuNsErpP",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FqOZoIvhj4rbL3yU1qFPa.jpg?alt=media&token=9f86b42f-e76c-41af-9092-6614da69da67",
    "name": "Sopa de posta"
  },
  {
    "id": "pG2OBXF0cn7e2Q750BKO",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F2dFh0BQlotQLA7AtciaE.jpg?alt=media&token=508d8f28-62c6-4975-a646-edd208e7d5f0",
    "name": "Sopa de res",
    "noSides": true
  },
  {
    "id": "Qw7fiAqnHmWw3KEWE1fN",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FVy6kdPnP59VoGsj8IsO2.jpg?alt=media&token=a001933f-bb5e-4c64-9d9d-05470f4a4127",
    "name": "Sopa de tortilla",
    "noSides": true
  },
  {
    "id": "Z1Pi3My6m5QOTNTNTCnj",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F2rLSxwXL5wlSLId78bFr.jpg?alt=media&token=64563259-4e1c-456a-938d-053c8b202aca",
    "name": "Tacos de carne (4 u)",
    "noSides": true
  },
  {
    "id": "1xnTM3euIzygQWYn2W3U",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FnW4cADH7rYU6sd2m3L0S.jpg?alt=media&token=5091b9fb-22b4-4509-8a60-90d3ae640cf5",
    "name": "Tacos de pollo (4u)",
    "noSides": true
  },
  {
    "id": "DWfUXJVsYjtzWY4e2IZE",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FVSArH6eLB8FnWSrm3dxu.jpg?alt=media&token=1267bec3-8f05-41f0-831d-42a4fbceb4b4",
    "name": "Tacos de res (4u)",
    "noSides": true
  },
  {
    "id": "q6YVQ09QkMybUNERiggU",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FpUqNjo2ymmqpum2oaQGm.jpg?alt=media&token=107b108c-2cd9-4f30-a2e7-e400425143b5",
    "name": "Tortitas de carne"
  },
  {
    "id": "25z5ZzgRLRV4JAFp1fcr",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fr9J7qVaOz5Ium4EsVUnK.jpg?alt=media&token=0307097a-9b1e-4104-88ac-20a7c973a6fb",
    "name": "Tortitas de fideos"
  },
  {
    "id": "S7PB6bPtolHpCgQy2WSE",
    "category": "Principal",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FvZ8Jg8eiac1sA02dxdKc.jpg?alt=media&token=5164ca5d-74e8-4cac-831b-bb052badb3da",
    "name": "Wrap de pollo (Este plato no incluye tortillas)"
  },
  {
    "id": "ZXMgT1KTg4MbaRjmQVue",
    "category": "Bebida",
    "description": "Botella con agua de 500ml",
    "extra": 0,
    "imageURL": "https://goo.gl/RPK9We",
    "name": "Agua"
  },
  {
    "id": "uaDlMEoZjBezU7nV7Clu",
    "category": "Bebida",
    "extra": 0,
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FDD6KuD26JksmZ8PnhABI.jpg?alt=media&token=53777aa4-c271-4ccb-bab0-f768c32af7d1",
    "name": "Cascada"
  },
  {
    "id": "TvZyX2gSZANyhxYorVPw",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F90kgpw8YhvpDvaFbi6b7.jpg?alt=media&token=1786eb19-79ea-4b3e-8247-e8a7f37a7fba",
    "name": "-"
  },
  {
    "id": "75l9I7lOaqBwVkFPzpQa",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FmwjVTwvL1cDqpCysSx7K.jpg?alt=media&token=a45ba8f1-eb52-4d44-9b77-698e291cde9e",
    "name": "2 tacos de pollo"
  },
  {
    "id": "AE2qq7iVMK2vZOunabZ4",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FXhajWTvno6BJjEhoOqd3.jpg?alt=media&token=522f6939-3c61-4bba-b2c3-1f49d04c5448",
    "name": "2 tacos de res"
  },
  {
    "id": "M0O98eITQNv6iNdtLOos",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F6KmAqKQ8ouoIvglec1Om.jpg?alt=media&token=d03fd96d-74e6-4a8a-a144-7c0902f6804b",
    "name": "Arroz a la jardinera"
  },
  {
    "id": "PKhERDp2aV5TtmZVg0Ua",
    "category": "Acompañamiento",
    "description": "Porcion de arroz blanco",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FgYZdFsqGZlwKJ9FveLt5.jpg?alt=media&token=a1401af2-0ffc-481a-98f6-a157d2ba140a",
    "name": "Arroz blanco"
  },
  {
    "id": "JtIZEokzySmW9VA354He",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FQ9ndkjO0XJFLTE8Qvmcf.jpg?alt=media&token=56194ccc-0b9d-4111-b900-2f13a0caed7c",
    "name": "Arroz con albahaca"
  },
  {
    "id": "XHf1oEQrpi3fvKKcnaen",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FbA9lfQ2Tz69qfq6DcY0m.jpg?alt=media&token=794aa7ab-0eb1-48a6-b3a1-3a080948c0a3",
    "name": "Arroz con elote"
  },
  {
    "id": "h8mDwwdbeuEqtuQdNyo8",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F2n8VknC0sfGgDOcWMEZB.jpg?alt=media&token=64df7c8e-4173-4d3c-8187-0a0a5d08f620",
    "name": "Arroz con guisantes"
  },
  {
    "id": "x98d1JpOPN80VV8woT1e",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FOvaTBvfWOvxMUuc1VEgz.jpg?alt=media&token=3d0c17e3-e42d-4f9c-abc1-178268f84780",
    "name": "Arroz con mani"
  },
  {
    "id": "iykNzxb635VzWnR8zJrT",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Ff1M2Ace5THZevyRkbtdN.jpg?alt=media&token=968b525d-b19f-4dcd-b59f-e79160ed99ac",
    "name": "Arroz con salchicha"
  },
  {
    "id": "Ys8QveGnYrojUmSxwGLv",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fb4vUbhKzvvRVbPZWUO8o.jpg?alt=media&token=ac238da7-b883-4740-ab08-c7b73916bccc",
    "name": "Arroz con verduras"
  },
  {
    "id": "0O8A49nl6NyfmEV8eXm9",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F537zf4wpsfROZJIkvT5o.jpg?alt=media&token=018e292e-062d-4510-89aa-3f78e99299ee",
    "name": "Arroz verde"
  },
  {
    "id": "Gvm7IJLCPkaMQlhT1kaZ",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F542dx6KJdPxWyuNKtxvZ.jpg?alt=media&token=b13f909d-d71c-46bd-9f06-e3241550ea11",
    "name": "Chirmol"
  },
  {
    "id": "YAQlTiYQBWMAYJG2IDFf",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FkMD3ciBvxOEyzdoEuJMR.jpg?alt=media&token=6a8c9351-c0bc-477e-af7b-4a66a63183fa",
    "name": "Chirmol"
  },
  {
    "id": "XZqDgNShoO8WJfSmhGBx",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FRJJLUBLOvwVMzsG1cnwC.jpg?alt=media&token=9c6b5669-42bb-4dac-bc42-4cd2939cdb0c",
    "name": "Chorizo (1u)"
  },
  {
    "id": "tzSRP9AwBwqssF6o9HIy",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FlD8qIow8ltNnwiOJzyqL.jpg?alt=media&token=b20905a6-373b-44d1-842a-9c55d112a53f",
    "name": "Ensalada de coditos"
  },
  {
    "id": "3wZfcO2pdS2iJzgPJu21",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FJmHOAGew6rsukpgXUdfG.jpg?alt=media&token=a5ae8601-407c-4a23-8034-b10701edc557",
    "name": "Ensalada de espinaca con garbanzos"
  },
  {
    "id": "90luVOXjtFuXRAByNDwW",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2Fs2CHDk5sU8ndtAzevvuM.jpg?alt=media&token=49617a69-7777-4387-9918-5b0c4f2cc9d0",
    "name": "Ensalada de papas"
  },
  {
    "id": "ReB7jocCeDL2SX6r0iUm",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FHlm8Av3K5ghO1287wQHs.jpg?alt=media&token=6ee39ad3-e55c-486f-a7b8-558498587878",
    "name": "Ensalada de pepino"
  },
  {
    "id": "Ic5Rd8Z2yiDkpKdmLvYr",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FTzRK22dGTs1TFyNRPBd1.jpg?alt=media&token=55dbf52e-017c-4abc-bb8e-1328b5e62ebf",
    "name": "Ensalada de repollo"
  },
  {
    "id": "nyspkGU5kqnfLVD480u5",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FY1syCgIahO3Oftpr1093.jpg?alt=media&token=3e473e74-4b19-4d60-8878-b86093607e77",
    "name": "Ensalada de tomate"
  },
  {
    "id": "0DMaHRUi5aVpJ1i0oW9E",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FoQP90xfPngbZPCcXOcb1.jpg?alt=media&token=0a9a326c-d776-4351-8990-75e2e4febae9",
    "name": "Ensalada de verduras"
  },
  {
    "id": "JAnaK3BBY89DB8SYV4I3",
    "category": "Acompañamiento",
    "description": "Porcion de ensalada fresca con lechuga, zanahoria, tomate.",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FXtuxPQUPO1CJnrPNDOHi.jpg?alt=media&token=6cd1b35b-b651-41ea-90e5-d9192f846464",
    "name": "Ensalada fresca"
  },
  {
    "id": "7sq42GKUF8UzaCdeq2xx",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FbEiHOuEcqZsAsn9PRcXE.jpg?alt=media&token=34ce2dc9-e15c-49d1-849f-5de305d4f1b6",
    "name": "Ensalada rusa"
  },
  {
    "id": "BAiuSays6TPPw2JsfzCh",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FO0fUUDPrXSKcwmpzo9MW.jpg?alt=media&token=e1851bac-2571-4bf7-8d3c-919bb188ecc3",
    "name": "Escabeche"
  },
  {
    "id": "pAVB1FNBJikH7teekbt7",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2F6YQouTvwo5psUvXhg7VR.jpg?alt=media&token=3a5e5ef5-0a1d-4ec0-822f-189fb7bb4999",
    "name": "Guacamole"
  },
  {
    "id": "YPs8zRyOCSl3gPrDM6L4",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FmfpCb3AcW5pJc8PpCSQq.jpg?alt=media&token=7ff2e063-2a50-4390-8941-75afce0a1bf8",
    "name": "Limón"
  },
  {
    "id": "tyDDl27U650WzSy6fVKt",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FXa0c8Xi6ivMKoqbAy9AO.jpg?alt=media&token=d4c12315-e097-4c85-8e34-87150f4f41a9",
    "name": "Pan con ajo"
  },
  {
    "id": "E4lIaWUvLMkVmDiBjiTz",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FKEUmuFKciSXUOhVV3RrS.jpg?alt=media&token=ff8b79d5-5c58-463e-8782-974c058a8c23",
    "name": "Papas a la crema"
  },
  {
    "id": "2cPgt0zjg7GwgoJFCbdF",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FdXgXxX7PF6zalXai1ub0.jpg?alt=media&token=837daaa3-caab-4fbe-9fe0-6a8d38d7485f",
    "name": "Puré de papa"
  },
  {
    "id": "5xyNRNRAw3qCPRpHyEpk",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FFQZUbLglrxnTVXgvgixd.jpg?alt=media&token=cebb9ef6-59f7-4568-a806-8c422745b839",
    "name": "Puré de papas"
  },
  {
    "id": "lrfBr6hZVkflGNCNa6oE",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FDoo7ghgV8APaqWDIqQbo.jpg?alt=media&token=c6b6f0ce-de00-4e07-aeda-57571da6035e",
    "name": "Verduras al vapor"
  },
  {
    "id": "SEstR9oFzO4pCtEje3XE",
    "category": "Acompañamiento",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/chantlisv-ac47b.appspot.com/o/productos%2FCTGCijP2cY79tp7sXbjQ.jpg?alt=media&token=280b5546-8b94-4df3-a25d-9d65bfff67d4",
    "name": "Verduras salteadas"
  }
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../admin-table.css']
})
export class ProductsComponent extends Table<Product>  {
  public displayedColumns = ['name', 'description', 'imageURL', 'actions'];
  selectedCategory = new BehaviorSubject<string>('Principal');

  $categories: Observable<Category[]>;

  backupData = BACKUP;

  constructor(
    public productsService: ProductsService,
    private categoriesService: CategoriesService,
    private af: AngularFirestore
  ) {
    super(productsService);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.$categories = this.categoriesService.getAll();


    console.log('init table');
    this.selectedCategory
      .pipe(
        switchMap(category => this.productsService.getAllByCategory(category)),
        takeUntil(this.ngUnsubscribe),
        tap(data => this.loaded = false)
      )
      .subscribe(data => {
        console.log('Table data : ', data)
        this.data = data;
        this.loaded = true;
        this.sortData();
      });
  }

  backup() {
    let batch = firebaseApp.firestore().batch();
    const col = this.af.collection<Product>('productos');
    let ref;
    for (let product of this.backupData) {
      ref = col.doc(product.id).ref;
      batch.set(ref, product);
    }
    batch.commit()
      .then(a => console.log(a))
      .catch(e => console.log(e));
  }
}