const operations_string= ['+','-','*','÷','/']

function checkStrIncludes(s,arr){
    if(s===undefined){
      return false
    }else{
      return arr.some(element=>s.toString().includes(element))
    }
  }

function starAdder(s){

        for(let i=0;i<s.length;i++){

        if(s[i]==')' && !checkStrIncludes(s[i+1],operations_string) && i<s.length-1){
            s=s.slice(0,i+1) + '*'+ s.slice(i+1)
          }
        }

       return s
}


function backDemimalCheck(s){
    for(let i=s.length-1;i>=0;i--){
        if(checkStrIncludes(s[i],operations_string)){
            console.log('yes')
            return s+"."
        }else if(checkStrIncludes(s[i],['.'])){
            console.log(i,":no")
            return s
        }
    }
}


let a = ".5555+324234*32978/3487+(234423)/43533+"

let b = backDemimalCheck(a)

console.log(b)