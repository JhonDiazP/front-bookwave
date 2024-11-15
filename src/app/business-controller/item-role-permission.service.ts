import { Injectable } from '@angular/core';
import { ItemRolePermission } from '../models/item-role-permission';
import { ServiceObject } from '../models/main/service-object';
import { ApiService } from '../api/api.service';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class ItemRolePermissionService {

  public itemsRolePermission: ItemRolePermission[] = [];

  constructor(private webAPI: ApiService) { }

  GetCollection(idRole: number): Promise<ItemRolePermission[]> {
    var servObj = new ServiceObject("item/role/permission/byRole", idRole);
    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        /*Armando los permisos*/
        localStorage.setItem('permissions', JSON.stringify(servObj.data.itemRolePermission));

        /*Armando el menu*/
        let mainMenu: Menu[] = [];
        servObj.data.itemRolePermission.forEach((element: any) => {
          if (!element.item.item_parent_id && element.permission_id === 1 && element.item.show_menu) {
            mainMenu.push({
              id: element.item.id,
              label: element.item.name,
              icon: element.item.icon,
              routerLink: element.item.route,
              children: [],
            });
          } else {
            mainMenu.forEach(elementB => {
              if (elementB.id === element.item.item_parent_id && element.permission_id === 1 && element.item.show_menu)
                elementB?.children?.push({
                  id: element.item.id,
                  label: element.item.name,
                  icon: element.item.icon,
                  routerLink: element.item.route,
                });
            });
          }
        });
      
        mainMenu.forEach(element => {
          if (element.children && element.children.length === 0) delete element.children;
        });



        localStorage.setItem('mainMenu', JSON.stringify(mainMenu));
        localStorage.setItem('firstMenu', JSON.stringify(mainMenu[0]));

        this.itemsRolePermission = <ItemRolePermission[]>servObj.data.itemRolePermission;
        return Promise.resolve(this.itemsRolePermission);
      })
      .catch(x => {
        throw x.message;
      });
  }
}
