        var pId = "";
        var fruit = "";
        var pPrice = "";
        var pCount = "";
        var pTotal = "";
        var gTotal="";
        var tempgTotal="";
        var pGst="";
        var tempGst="";
        var pDiscount="";
        var tempDiscount="";
        var pBillamt="";
        var tempBillamt="";
        var products =[];
                      

        function getInputs(){
            pId = document.getElementById('pId');
            fruit = document.getElementById('fruit');
            pPrice = document.getElementById('pPrice');
            pCount = document.getElementById('pCount');
            pTotal = document.getElementById('pTotal');
            gTotal= document.getElementById('gTotal');
            pGst= document.getElementById('pGst');
            pDiscount= document.getElementById('save');
            pBillamt= document.getElementById('bAmt');
        }
        function calcTotal(){
            getInputs();
            pTotal.value = Number(pPrice.value) * Number(pCount.value);
        }
        function grandTotal(){
          let gTotalValue = 0;
          for(let product of products){
            gTotalValue=gTotalValue+Number(product[4]);
          }
          gTotal.value = gTotalValue;
          grandGst();
          applyDiscount();
          billAmount();
        }
        function grandGst(){
            tempGst=gTotal.value/100;
            pGst.value=tempGst*18;
            pGst.value=Math.floor(pGst.value);

        }

        function addProduct(){
            getInputs();   
              if(fruit.value != "" && pCount.value != "")
            {
              if (findDuplicate() == false){
              let newProduct = [pId.value, fruit.value, pPrice.value, pCount.value, pTotal.value];
              products.push(newProduct);
            }

        }
        
        grandTotal();
            displayProducts();
            resetEntry();
            clearData();
        }

        function resetEntry(){
            document.getElementById('pId').value = "";
            document.getElementById('fruit').value = "";
            document.getElementById('pPrice').value = "";
            document.getElementById('pCount').value = "";
            document.getElementById('pTotal').value = "";
        }

        function deleteProduct(pIdx){
            products.splice(pIdx, 1);
            displayProducts();
            grandTotal();
        }

        
        function billAmount(){
            tempDiscount=Number(gTotal.value)+Number(pGst.value);
            tempBillamt=tempDiscount-pDiscount.value;
            pBillamt.value=tempBillamt;
          }
        
        function updateProduct(pIdx){
            let existingProduct = products[pIdx];
            document.getElementById('pId').value = existingProduct[0];
            document.getElementById('fruit').value = existingProduct[1];
            document.getElementById('pPrice').value = existingProduct[2];
            document.getElementById('pCount').value = existingProduct[3];
            document.getElementById('pTotal').value = existingProduct[4];
            products.splice(pIdx, 1);
            grandTotal();
        }

        displayProducts();
        function displayProducts(){

            let result = '';

            for(let pIdx=0; pIdx < products.length; pIdx++){

                console.log(products[pIdx]);
                // let existProd = products[pIdx];
                result += '<div class="row mt-4">'
                for(let pdIdx=0; pdIdx < products[pIdx].length; pdIdx++){
                    console.log(products[pIdx][pdIdx]);
                    result += '<div class="col">' + products[pIdx][pdIdx] + '</div>';
                }
                
                result += '<div class="col">' +
                            '<button type="button" class="btn btn-warning" onclick="updateProduct('+ pIdx +')"> Update </button>' +
                            '<button type="button" class="btn btn-danger" onclick="deleteProduct('+ pIdx +')"> Delete </button>' +
                          '</div> </div>';
            }
            
            document.getElementById('productsDisplay').innerHTML = result;
        }
        function getProductDetail() {
            let pId = "";
            let pPrice = "";
            switch (document.getElementById("fruit").value) {
              case "Apple":
                pId = 1001;
                pPrice = 100;
                break;
              case "Banana":
                pId = 1002;
                pPrice = 80;
                break;
              case "Blueberries":
                pId = 1003;
                pPrice = 130;
                break;
              case "Cherry":
                pId = 1004;
                pPrice = 245;
                break;
              case "Dates":
                pId = 1005;
                pPrice = 340;
                break;
              case "Fig":
                pId = 1006;
                pPrice = 155;
                break;
              case "Grape":
                pId = 1007;
                pPrice = 95;
                break;
              case "Kiwi":
                pId = 1008;
                pPrice = 190;
                break;
              case "Lychee":
                pId = 1009;
                pPrice = 265;
                break;
              case "Mango":
                pId = 1010;
                pPrice = 250;
                break;
              default:
                console.log("Invalid product");
            }
            document.getElementById("pId").value = pId;
            document.getElementById("pPrice").value = pPrice;
          }
          function findDuplicate() {
            let isDuplicateFound = false;
            for (let pIdx = 0; pIdx < products.length; pIdx++) {
              console.log(pIdx, products, products[pIdx], pId.value);
              if (products[pIdx][0] == pId.value) {
                products[pIdx][3] =
                  Number(products[pIdx][3]) + Number(pCount.value);
                products[pIdx][4] = products[pIdx][2] * products[pIdx][3];
                isDuplicateFound = true;
              }
            }
            return isDuplicateFound;
          }
          
          function applyDiscount(){
            const tempdis=1000;
            tempDiscount=Number(gTotal.value)+Number(pGst.value); 
                if(tempDiscount>=tempdis){
                tempDiscount=tempDiscount/100;
                pDiscount.value=tempDiscount*10;
                pDiscount.value=Math.floor(pDiscount.value);

                   
            }else
            {
                tempDiscount=tempDiscount/100;
                pDiscount.value=tempDiscount*2;
                pDiscount.value=Math.floor(pDiscount.value);  
            }
          }
 
