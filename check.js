const operations_string= ['+','-','*','÷','/']
const numbers_string=['0','1','2','3','4','5','6','7','8','9','.']

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
    for(let i=s.length;i>=0;i--){
        if(checkStrIncludes(s[i],operations_string)){
            console.log('yes')
            return s+"."
        }else if(checkStrIncludes(s[i],['.'])){
            console.log(i,":no")
            return s
        }
    }
}

function zeroRemover(s){
    let iter=s.length-1
    while(iter>0){
        if(s[iter]=='0'){
            iter--
        }else{
            break
        }
    }
    
    if(iter==0){
        return ''
    }

    if(s[iter]!='.' && !checkStrIncludes(s[iter],numbers_string)){
        s= s.slice(0,iter+1)
    }
    return s
}


let a = "000"

let b = zeroRemover(a)

console.log(b)