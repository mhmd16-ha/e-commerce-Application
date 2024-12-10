export class ApiFeather{
constructor (mongosseQuery,searchQuery){
    this.mongosseQuery=mongosseQuery,
    this.searchQuery=searchQuery
}
pagination(){
  let pageNumber=this.searchQuery.page *1 || 1
  if(pageNumber<1) pageNumber=1
  const limit=2
  let skip=(parseInt(pageNumber-1))*limit
  this.pageNumber=pageNumber
  this.mongosseQuery.skip(skip).limit(limit)
  return this
}
filter(){
let filterObj=structuredClone(this.searchQuery)
 filterObj=JSON.stringify(filterObj)
 filterObj=filterObj.replace(/(gt|gte|lt|lte)/g,value=>`$${value}`)
 filterObj=JSON.parse(filterObj)
 let excludedFields=['page','sort','search','fields']
 excludedFields.forEach(val=> {delete filterObj[val] })
 this.mongosseQuery.find(filterObj)
return this
}
sort(){
if(this.searchQuery.sort){
    let sortedBy=this.searchQuery.sort.split(',').join(' ')
     this.mongosseQuery.sort(sortedBy)
  }
  return this
}
fields(){
    if(this.searchQuery.fields){
        let selectedBy=this.searchQuery.fields.split(',').join(' ')
        this.mongosseQuery.select(selectedBy)
}
return this
}
search(){
    if(this.searchQuery.search){
  
        this.mongosseQuery.find({
         $or:[
           {title:{$regex:this.searchQuery.search,$options:'i'}},
           {description:{$regex:this.searchQuery.search,$options:'i'}},
         ]
        })
     }
     return this
}
}