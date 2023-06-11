function CreatArray(Length){
    const rows = Length;
    const cols = 7;
    
    const Data = new Array(rows);
    for (let i = 0; i < rows; i++) {
      Data[i] = new Array(cols);
    }
    
    return Data
}
function datapusher(index_i_value,index_j_value,DataToUse,Data){
   
    Data[index_i_value][index_j_value]=DataToUse;
    
    



}
function groupNamesByForthValue(data) {
   const unique =[...new Set(data.map(arr => arr[6]))];
  const uniqueLists = [];
  console.log('this is unique',unique);

  unique.forEach(item => {
    const list = [];
    const ID_s=[];
    data.forEach(arr => {
      if (arr[6] === item) {
        list.push(` ${arr[1]} ${arr[2]}`);
        ID_s.push(`${arr[4]}`)
        
      }
      
    });
    uniqueLists.push({
      team_name: item,
      members: list,
      ID_s:ID_s,
    });
  });

  return uniqueLists;
  }
function PushToArray(PushedData,Length){
    if(typeof PushedData==='object'){
        
        let array=CreatArray(Length);
        for( i=0;i<Length;i++){
            for (j=0;j<1;j++){
               
                var R=j;
                const {
                    id_member,
                    member_f_name,
                    member_l_name,
                    member_email,
                    team_name,
                    member_role,
                    team_ID,
                    }=PushedData[i];
                    
                    datapusher(i,j,id_member,array);
                    j++
                    
                    datapusher(i,j,member_f_name,array);
                    j++
                   
                    datapusher(i,j,member_l_name,array);
                    j++
                    
                    datapusher(i,j,member_email,array);
                    j++
                    datapusher(i,j,team_ID,array);
                    j++
                    datapusher(i,j,member_role,array);
                    j++
                    datapusher(i,j,team_name,array);
                    
                    j=R;
                    
            }
        }
        
        return groupNamesByForthValue(array);
        
    }
    else {
        throw'Please insert Object DATA';
    }
}
module.exports={
    CreatArray,
    datapusher,
    PushToArray
}