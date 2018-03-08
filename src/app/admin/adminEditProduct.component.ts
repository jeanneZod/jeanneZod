import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../model/product.model';
import { StaticProducts } from '../model/product.repository';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestDataSource } from '../admin/authenticate.admin';
import { AuthService } from '../model/auth.service';
import { NgForm} from '@angular/forms';


@Component({
    selector: 'app-editor',
    providers: [StaticProducts, RestDataSource],
    templateUrl: './adminEditProduct.component.html'
})
export class AdminEditProductComponent  implements OnInit{
    private productId: number = null;
    //openBoard = false;
    messageSuccess = null;
    photo = null;
    images: string[] = null;
    arr: string[] = [];
    fileExistsMess: string = null;
    imgSrcs = [];
    imgToSend: string = null;
    productUpdated: string = null;
    edit = false;
    create = false;
    productExists: string = null;
    arraySent = false;
    productsList: Observable<Product[]> ;
    constructor(private data: StaticProducts,
        private router: Router,
        private product:Product,
        private authenticate: RestDataSource,
        private activatedRoute: ActivatedRoute) {
            this.activatedRoute.queryParams
                .subscribe((queryParams: Params) => {
                    if(queryParams['edit'] === 'edit'){
                        this.productId = queryParams['id'];
                        this.edit = true;
                    } else{
                        this.create = true;
                        //this.openBoard = true;
                    }
                    
                });
         }

         ngOnInit(){
             if (this.edit === true){
                this.authenticate.getProduct(this.productId).subscribe(prd => {
                    this.product = prd;
                    this.imgSrcs = [];
                    if(this.product.images){
                        this.images = this.product.images;
                        this.images.map(im => {
                            this.getPhoto(im);
                        })
                    }
                });      
             }
            

        }
// RETOUR A LA LISTE DE PRODUITS
    returnProductList(){
        this.router.navigate(['/editor']);
    }

 
 // DISPLAY DES INFORMATIONS SUR LE PRODUIT on click
   seeProduct(id) {
            this.authenticate.getProduct(id).subscribe(prd => {
                this.product = prd;
                if(this.product.images){
                    this.imgSrcs = [];
                    this.images = this.product.images;
                    this.images.map(im => {
                        this.getPhoto(im);
                    })
                }
            });         

            
    }

 //  RAJOUT DE NOUVELLES IMAGES AU PRODUIT: input d'images
    onFileChange(files: FileList) {
    if (this.arr.length>0){
        for(let it of this.arr){
            if (it === files.item(0).name){
                this.fileExistsMess = "Merci de choisir une autre image, celle-ci fait déjà partie de la liste";
                return;
            }else{
                this.arr.push(files.item(0).name);
                this.imgToSend = "Images à envoyer vers le serveur: ";
                this.fileExistsMess = null;
                return;
            }
        }         
        }else {
            this.arr.push(files.item(0).name);
        }
    }

// SUPPRIMER UNE IMAGE SUR LA LISTE D'IMAGES A RAJOUTER A LA BASE DE DONNÉES
    deleteImg(image: string){
        const index = this.arr.findIndex((item)=>image === item);
        this.arr.splice(index, 1);
    }


    // SAUVEGARDE D'IMAGES DANS LA BASE DE DONNÉES
    savePhotos() {
       if (this.arr.length>0){
           for(let item of this.arr) {
            this.authenticate.savePhotos(item).subscribe(data => {
                    this.product.images = this.arr;
                    this.messageSuccess = "Vous avez enregistré les images";
                    this.imgToSend = "Images sont envoyées:  ";
                    this.arraySent = true;
            });
           }
        } else{
            this.fileExistsMess = 'Il n\'y a pas d\'images à envoyer';
            return false;
        }
    }

    // LISTE D'IMAGES DISPONIBLES POUR LE PRODUIT
    getPhoto(photoName: string) {
        if (photoName !== undefined){
            this.authenticate.getPhoto(photoName).subscribe(photo => { 
                if (photo !== null){
                    this.photo = photo; 
                    this.imgSrcs.push({src: this.photo, data:photoName});
                    /*const img = <HTMLElement>document.createElement("img");
                    img.setAttribute('src', `data:image/jpeg;base64,${this.photo}`);
                    const my_div = document.getElementById("createPictures");
                    my_div.appendChild(img);*/
                } 
             });
        } else{
            return false;
        }
    }
    // SUPPRESSION D'IMAGE EXISTANTE DANS LE PRODUIT
    deleteProductImg(index){
        this.product.images.splice(index, 1);
        const img = document.getElementById(`image_${index}`);
        img.style.display = 'none';
    }

    // SAUVEGARDE DU PRODUIT
    saveProduct(product){
        if(this.edit === true){
            if (this.arr.length>0){
                this.product.images = product.images.concat(this.arr);
            }
            this.authenticate.updateProduct(product).subscribe();
            this.productUpdated = "Le produit a bien été mis à jour!";
        } else {
            this.product.images = this.arr;
            if (product.name !== undefined || product.category !== undefined){
                this.authenticate.addProduct(product).subscribe(resp => {
                    if(resp === false){
                        this.productExists = 'Le produit avec ce nom existe déjà dans votre base de données';
                        return false;
                    }else{
                        this.productUpdated = "Le nouveau produit a été engregistré!";
                    }
                });
            } else{
                this.productExists = 'Merci de renseigner le nom du produit et la catégorie';
            }
            
        }
    }

    deleteProduct(product){
        this.authenticate.deleteProduct(product._id).subscribe(resp =>{
            this.router.navigate(['/editor']);
        });
    }
    
}

