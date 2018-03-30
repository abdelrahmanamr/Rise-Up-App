import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-items',
  template: ``
 
 
})
export class ItemsComponent {

  ngOnInit() 
  {
      

       
  }




}
<<<<<<< HEAD

</style>
</head>

<body>

  

<table id="products">
  <tr>
    <th>Name</th>
    <th>Website</th>
    <th>Seller Name</th>
    <th>Created At</th>
    <th>Updated At</th>
    <th></th>
    <th></th>
  </tr>
  
<tr *ngFor="let item of data">
  <td>{{item.name}}</td>
  <td>{{item.price}}</td>
  <td>{{item.sellerName}}</td>
  <td>{{item.createdAt}}</td>
  <td>{{item.updatedAt}}</td>
  <td><button type="button" class="btn btn-default" (click)="delete(item._id)">Delete</button></td>
  <td><button type="button" class="btn btn-default" (click)="edit(item._id)">Update</button></td>

  </tr>
</table>
<button type="button" style="width:10" class="btn btn-default" (click)="add()">Add A Company</button>


</body>
</html>`
})
export class ItemsComponent {
  data =[];
  constructor(private http: HttpClient,private router: Router){}

  ngOnInit() 
  {
       this.http.get('http://localhost:3000/api/admin/viewCompanies').
       subscribe(res =>{this.data=res["data"]});
  }
  
  
  add()
  {
    window.location.replace("#/dashboard/addcompany");
    
  }

  delete(id : string)
  {
    this.http.delete('http://localhost:3000/api/admin/removeCompany/'+id).subscribe(res=>{window.location.reload()});
  }
}
=======
>>>>>>> 552d6ba99f494b26bc26481798c7829ef27ae95f
