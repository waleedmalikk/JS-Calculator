class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }

    reverse(s){

      return s.split("").reverse().join("")
    }

    getStrLastElement(s){

      return s.toString()[s.length-1]
    }

    checkStrIncludes(s,arr){

      if(s===undefined){
        return false
      }else{
        return arr.some(element=>s.toString().includes(element))
      }
    }

    strIndexesContainArr(s,arr){

      let inds=[]
      if(s!==undefined){
        for (let i = 0; i < s.toString().length; i++){
          if(arr.some(element=>s.toString()[i].includes(element))){
            inds.push(i)
            }
          }
        }
      return inds
    }
    
    insertBeforeAfterDecimal(s){

      let indices=[]
      for(let i=0;i<s.length;i++){
          if(s[i]=='.'){
              indices.push(i)
          }
      }
      for (let i=0; i<indices.length;i++){
          if(!this.checkStrIncludes(s[indices[i]-1],numbers_string) && !this.checkStrIncludes(s[indices[i]+1],numbers_string)){
            s = s.split('')
              s[indices[i]] = '0'
              s = s.join('')
          }
      }
      return s.toString()
  }

  
    backDemimalCheck(s){

      for(let i=s.length-1;i>=0;i--){
          if(this.checkStrIncludes(s[i],['.'])){
              return true
          }else if(this.checkStrIncludes(s[i],operations_string)){
              return false
          }
      }
  }

    braketRemoval(s){

      let arr=[]
      for (let i= 0;i<s.length;i++){
        if(s[i]==='('){
          arr.push(i)
        }else if(s[i]===')'){
          arr.splice(arr.length-1,1)
        }
      }

      for (let i = 0; i < arr.length; i++) {
        s= s.slice(0,arr[i]) + s.slice(arr[i]+1)
      }
      return s
    }

    starAdder(s){

      for(let i=0;i<s.length;i++){

      if(s[i]==')' && !this.checkStrIncludes(s[i+1],operations_string) && i<s.length-1){
          s=s.slice(0,i+1) + '*'+ s.slice(i+1)
        }
      }
    return s
    }

     zeroRemover(s){
      let iter=s.length-1
      while(iter>=0){
          if(s[iter]=='0'){
              iter--
          }else{
              break
          }
      }    
      if(iter==0 && s[iter]=='0'){
          return ''
      } 
      if(s[iter]!='.' && !this.checkStrIncludes(s[iter],numbers_string)){
          s= s.slice(0,iter+1)
      }
      return s
  }

    clear() {

      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }

    delete() {

      this.currentOperand=this.currentOperand.toString().slice(0,-1)
    } 

    equals(){

      if(this.previousOperand!=''){
        this.currentOperand=this.previousOperand
        // this.currentOperand=''
      }
    }

    plusMinusFunc(){

      if(this.currentOperand===''){
        return
      }

      let lastCharacter= this.getStrLastElement(this.currentOperand)

      if(this.checkStrIncludes(lastCharacter,operations_string) ){

        return
      }else if(lastCharacter===')'){
        let inds=this.strIndexesContainArr(this.currentOperand,operations_string)
        this.currentOperand= this.currentOperand.toString().substring(0,inds[inds.length-1]-1)+ this.currentOperand.toString().substring(inds[inds.length-1]+1, this.currentOperand.toString().length-1)

      }else{
        let insert_ind=0
        let indices=this.strIndexesContainArr(this.currentOperand,operations_string)
        if (indices.length!==0){
          insert_ind=indices[indices.length-1]+1
        }
        this.currentOperand = this.currentOperand.toString().substring(0,insert_ind)+"(-"+ this.currentOperand.toString().substring(insert_ind)+")"
        }
      }
  
    append(addition) {

      if(this.currentOperand.toString().length>100){
        console.log('character limit exceeded')
        return
      }

      let lastCharacter= this.getStrLastElement(this.currentOperand)

      if(this.currentOperand.toString()===''){
        if( this.checkStrIncludes(addition.toString(),operations_string) || addition=="%" ){
          return
        }
      }

      if(addition.toString()==='.'){
        if(lastCharacter==='.'){
          return
        }
        if(this.backDemimalCheck(this.currentOperand.toString())){
          return
        }
      }

      if(addition.toString()=='%' || addition.toString()=='÷'){
        if(lastCharacter==='÷' || lastCharacter=='%'){
          return
        }
      }

      if(this.checkStrIncludes(lastCharacter,['0'])){
        this.currentOperand= this.zeroRemover(this.currentOperand)
      }

      if(this.checkStrIncludes(lastCharacter,operations_string) && this.checkStrIncludes(addition,operations_string)){
        this.currentOperand =  this.currentOperand.toString().slice(0,-1)+ addition.toString()
      }
      else{
        this.currentOperand = this.currentOperand.toString() + addition.toString()
      }
    } 

    answer(){

      let current_query=this.currentOperand.toString()
      current_query=this.insertBeforeAfterDecimal(current_query)
      
      current_query=current_query.replaceAll('÷','/')

      for (let i=0;i<current_query.length;i++){
        if(current_query[i]=="%"){
          if(i!=current_query.length-1 && !this.checkStrIncludes(current_query[i+1],operations_string)){
            current_query= current_query.slice(0,i)+'/100*'+current_query.slice(i+1)
          }else{
            current_query= current_query.slice(0,i)+'/100'+current_query.slice(i+1)
          }
        }
      }

      current_query=this.braketRemoval(current_query)

      if(current_query.length==1 && this.checkStrIncludes(current_query,operations_string)){
        current_query=""
        }

      current_query= this.starAdder(current_query)

      let lastCharacter= this.getStrLastElement(current_query)
      
      if(this.checkStrIncludes(lastCharacter,operations_string) ){
        current_query=current_query.slice(0,-1)
      }

       try{
        let ans= eval(current_query)  
        this.previousOperand=ans    

       }catch(error){
        this.previousOperand="ERROR"
       }
    }

    updateDisplay() {
      this.currentOperandTextElement.innerText = this.currentOperand

      if(!this.checkStrIncludes(this.currentOperand,operations_string) && !this.checkStrIncludes(this.currentOperand,['%'])){
        this.previousOperand=''
      }
      if(this.currentOperand==''){
        this.previousOperand=''
      }
        this.previousOperandTextElement.innerText= this.previousOperand  
    }
}

const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const percentButton = document.querySelector('[percent-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const plusMinusButton = document.querySelector('[sign]')
const operations_string= ['+','-','*','÷','/']
const numbers_string=['0','1','2','3','4','5','6','7','8','9','.']
const non_numbers_string=['0','1','2','3','4','5','6','7','8','9','.','%','(',')','+','-','*','÷','/']

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.append(button.innerText)
    calculator.answer()
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.append(button.innerText)
    calculator.answer()
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', ()  =>{
  calculator.equals()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', ()  =>{
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', ()  =>{
  calculator.delete()
  calculator.answer()
  calculator.updateDisplay()
})

plusMinusButton.addEventListener('click', () =>{
  calculator.plusMinusFunc()
  calculator.answer()
  calculator.updateDisplay()
})

percentButton.addEventListener('click', ()=>{
  calculator.append(percentButton.innerText)
  calculator.answer()
  calculator.updateDisplay()
})