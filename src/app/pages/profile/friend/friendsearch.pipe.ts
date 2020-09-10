import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendsearch'
})
export class FriendsearchPipe implements PipeTransform {

  transform(value: any[], searchTerm: any): any {
    if(value.length ===0){
      return value
    }
    return value.filter(function(search){
      return search.Username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    })
  }

}
