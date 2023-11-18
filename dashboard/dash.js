
function move(elem, percent) {
  var i = 0;
  if (i == 0) {
    i = 1;
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= percent) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        if(width>90){
            elem.style.backgroundColor="rgb(6, 220, 235)"
        }
      }
    }
  }
}




const firebaseConfig = {
  apiKey: "AIzaSyASKwrxitavZdYswncnwIRxVkJARnktV9U",
  authDomain: "spiceeauthstorage.firebaseapp.com",
  databaseURL: "https://spiceeauthstorage-default-rtdb.firebaseio.com",
  projectId: "spiceeauthstorage",
  storageBucket: "spiceeauthstorage.appspot.com",
  messagingSenderId: "183905325189",
  appId: "1:183905325189:web:ac65db60a2c77025b959ec"
};
  


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database();
var auth = firebase.auth()
//firebase.auth().currentUser

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //alert("signed in")


      var user_ref = database.ref('users/'+user.uid)
      user_ref.on('value', function(snapshot){
        var data = snapshot.val()
        document.getElementById('welcomesignout').innerHTML+=data.first_name;
        if(data.waitlist==true){
          document.write("You are on the waitlist. You must be manually approved by an admin.")
        }

      })
      //alert(firebase.auth().currentUser)





    } else {
      window.location.href="../login/login.html"
    }
  });




//check orders
var user_ref2 = database.ref('/'+"")
        user_ref2.once('value', function(snapshot){
          var data = snapshot.val();
          
          for (let i = 0; i <= data.orders.num; i++) {

            var user_ref3 = database.ref('orders/'+[i])
          user_ref3.once('value', function(snapshot){
          var data2 = snapshot.val();
            if (data2.customerUID==firebase.auth().currentUser.uid){
              //active order

              document.getElementById('orderbanner').innerHTML="Looks like you have an order of "+data2.order+' on the way!';
              document.getElementById('orderbanner2').innerHTML="Order placed on "+data2.date;
              var cancelOrderBtn = document.createElement('button')
              document.getElementById('progressDiv').appendChild(cancelOrderBtn)
              cancelOrderBtn.id='cancelOrder1'
              cancelOrderBtn.innerHTML="Cancel Order"
              if(data2.shippment>40){
                //cant be returned
                cancelOrderBtn.disabled=true;
              cancelOrderBtn.style.backgroundColor="grey"
              }else{
                document.getElementById('cancelOrder1').addEventListener('click', function(e){
                  e.preventDefault()
                  if(alert('Your order has been canceled.')==true){
                    for (let f = 0; f <= data.orders.num; f++) {
  
                    var user_ref4 = database.ref('orders/'+[f])
                      user_ref4.once('value', function(snapshot){
                      var data3 = snapshot.val();
              if (data3.customerUID==firebase.auth().currentUser.uid){
                //active order
                //alert(data3.number)
                database.ref('orders/'+[data3.number]).remove()
  
                  }
                })
                } 
              }
  
              var user_ref10 = database.ref('/'+"")
              user_ref10.once('value', function(snapshot){
                var data12 = snapshot.val();
      
      
                console.log(data12.orders.num)
                
                database.ref('orders/'+"").update({
                  num: data12.orders.num-1
                });
  
              })
  
              document.getElementById('orderbanner').innerHTML="Loading..."
              document.getElementById('orderbanner2').remove();
              cancelOrderBtn.disabled=true;
              cancelOrderBtn.style.backgroundColor="grey"
              setTimeout(() => {
                window.location.reload();
              }, 3000);
  
  
  
            })
              }

              

              if(data2.shippment<=20&data2.shippment>=0){
                move(document.getElementById('myBar1'), 75)
              }

              if(data2.shippment<=40&data2.shippment>=20){
                move(document.getElementById('myBar1'), 100)
                move(document.getElementById('myBar2'), 60)
                
              }
              if(data2.shippment<=60&data2.shippment>=40){
                move(document.getElementById('myBar1'), 100)
                move(document.getElementById('myBar2'), 100)
                move(document.getElementById('myBar3'), 40)
                
              }
              if(data2.shippment<=80&data2.shippment>=60){
                move(document.getElementById('myBar1'), 100)
                move(document.getElementById('myBar2'), 100)
                move(document.getElementById('myBar3'), 100)
                move(document.getElementById('myBar4'), 50)
                
              }
              if(data2.shippment<=100&data2.shippment>=80){
                move(document.getElementById('myBar1'), 100)
                move(document.getElementById('myBar2'), 100)
                move(document.getElementById('myBar3'), 100)
                move(document.getElementById('myBar4'), 100)
                
              }
              if(data2.shippment==100){
                move(document.getElementById('myBar1'), 100)
                move(document.getElementById('myBar2'), 100)
                move(document.getElementById('myBar3'), 100)
                move(document.getElementById('myBar4'), 100)
                move(document.getElementById('myBar5'), 100)
                document.getElementById('orderbanner').innerHTML="Your order was delivered"
              }
              
            }

            
        })
          }
         })
         











//order
function order(item){
    document.getElementById('terms').style.display='block'
    document.getElementById('termsitem').innerHTML+=item
    document.getElementById('agreeTerms').addEventListener('click', function(){
        //add order


        var user_ref2 = database.ref('/'+"")
        user_ref2.once('value', function(snapshot){
          var data3 = snapshot.val();
          for (let i = 0; i <= data3.orders.num; i++) {

            var user_ref3 = database.ref('orders/'+[i])
          user_ref3.once('value', function(snapshot){
          var data2 = snapshot.val();

            if (data3.orders.num!=0&&data2.customerUID==firebase.auth().currentUser.uid){
              alert('You already have an active order. Order aborted.')
            }else{
              var user_ref = database.ref('/'+"")
              user_ref.once('value', function(snapshot){
                var data = snapshot.val();
      
      
                console.log(data.orders.num)
                
                database.ref('orders/'+"").update({
                  num: data.orders.num+1
                });
      
                var user_ref1 = database.ref('users/'+firebase.auth().currentUser.uid)
            user_ref1.on('value', function(snapshot){
              var data1 = snapshot.val()
              
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, '0');
              var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
              var yyyy = today.getFullYear();
              
              today = mm + '/' + dd + '/' + yyyy;
            
      
                database.ref('orders/'+[data.orders.num+1]).set({
                  customerUID: firebase.auth().currentUser.uid,
                  order: item,
                  shippment: 5,
                  ordername: data1.first_name,
                  date:today,
                  number:data.orders.num+1
                });
                
              })
              })
              
              var conformation = document.createElement('div');
              document.body.appendChild(conformation);
              conformation.style="    border-radius: 16px;box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);backdrop-filter: blur(9.5px);-webkit-backdrop-filter: blur(9.5px);border: 1px solid rgba(255, 255, 255, 0.3);position: absolute;left: 50%;top: 50%;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);height: 30%;width: 50%;text-align: center;"
              conformation.innerHTML='<h1> Thanks, Order Placed</h1><p/><button id="cancelOrder"style="background-color:green;" onclick="window.location.reload();">Done</button>'
            }
        })
          }
         })
         document.getElementById('terms').remove()

        

      




    })
}






//admins
setTimeout(() => {
  

  var user_ref3223 = database.ref('users/'+firebase.auth().currentUser.uid)
  user_ref3223.once('value', function(snapshot){
                  var data44 = snapshot.val();
                  //alert(data44.admin)
  if (data44.admin==false){
    document.getElementById('admin-box').remove();
  }else{

  





var user_ref = database.ref('/'+"")
              user_ref.once('value', function(snapshot){
                var data = snapshot.val();



                for (let f = 0; f <= data.orders.num; f++) {
  
                  var user_ref4 = database.ref('orders/'+[f])
                    user_ref4.once('value', function(snapshot){
                    var data3 = snapshot.val();

                    var selectval = document.createElement('option')
                    selectval.value=data3.number
                    selectval.innerHTML = data3.number+" : "+data3.ordername
                    document.getElementById('orderChooser').appendChild(selectval)
                    })}
                    //document.getElementById("orderChooser").value
              //active order
              //alert(data3.number)
             // database.ref('orders/'+[data3.number]).remove()

             var oldval=""


             setInterval(() => {


              if(oldval!=document.getElementById('orderChooser').value){
                var user_ref49 = database.ref('orders/'+document.getElementById("orderChooser").value)
             user_ref49.once('value', function(snapshot){
             var data32 = snapshot.val();
           
              console.log(data32)

             document.getElementById('orderPosSlider').value=data32.shippment;
             var valOutput = ""
             setInterval(() => {
              //document.getElementById('orderPosBanner').innerHTML=document.getElementById('orderPosSlider').value

              if(document.getElementById('orderPosSlider').value==0){
                valOutput="Cancel Order"
              }
              
              if(document.getElementById('orderPosSlider').value<=20&document.getElementById('orderPosSlider').value>0){
                valOutput="Ordered"
              }

              if(document.getElementById('orderPosSlider').value<=40&document.getElementById('orderPosSlider').value>20){
                valOutput="Accepted"
                
              }
              if(document.getElementById('orderPosSlider').value<=60&document.getElementById('orderPosSlider').value>40){
                valOutput="Prepared"
                
              }
              if(document.getElementById('orderPosSlider').value<=80&document.getElementById('orderPosSlider').value>60){
                valOutput="Transport"
                
              }
              if(document.getElementById('orderPosSlider').value<=100&document.getElementById('orderPosSlider').value>80){
                valOutput="Delivering"
                
              }
              if(document.getElementById('orderPosSlider').value==100){
                valOutput="Delivered"
              }
              console.log(valOutput)
              document.getElementById('orderPosBanner').innerHTML=document.getElementById('orderPosSlider').value+": "+valOutput
}, 1);
             document.getElementById('commitOrderChange').addEventListener('click', function(){

              if(document.getElementById('orderPosSlider').value==0){
                database.ref("orders/"+[data32.number]).remove();
                var user_ref10 = database.ref('/'+"")
                user_ref10.once('value', function(snapshot){
                  var data12 = snapshot.val();
        
        
                  console.log(data12.orders.num)
                  
                  database.ref('orders/'+"").update({
                    num: data12.orders.num-1
                  });
    
                })
              }else{
              database.ref('orders/'+[data32.number]).update({
                shippment: document.getElementById('orderPosSlider').value,
              });
            }
             })

                
              
            })
              oldval=document.getElementById('orderChooser').value

                
              }
             }, 1);
              })

            }





            })}, 250);