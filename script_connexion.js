//SCRIPT POUR CONNEXION ACTIVE OU NON :
const wrapper = document.querySelector(".wrapper"),
    toast = wrapper.querySelector(".toast"),
    title = toast.querySelector("span"),
    subTitle = toast.querySelector("p"),
    wifiIcon = toast.querySelector(".icon"),
    closeIcon = toast.querySelector(".close-icon");
window.onload = ()=>{
    function ajax(){
        //crée un nouveau XML object (échange de donnée)
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
        xhr.onload = ()=>{
            if(xhr.status == 200 && xhr.status < 300){
                toast.classList.remove("offline");
                title.innerText = "You're online now";
                subTitle.innerText = "Internet is connected !";
                wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
                //ne rends plus la notif visible quand on click sur l'icone de fermeture
                closeIcon.onclick = ()=>{
                    wrapper.classList.add("hide");
                }
                //fermer la notif au bout de 5 secondes
                setTimeout(()=>{
                    wrapper.classList.add("hide");
                }, 5000);
            } else{
                //appelé la fonction offline
                offline();
            }
        }
        xhr.onerror = ()=>{
            //pour toute erreur detecté, appellé la fonction offline
            offline();
        }
        //Envoie de la requête GET à l'URL passée
        xhr.send();
    }
    function offline(){
        wrapper.classList.remove("hide");
        toast.classList.add("offline");
        title.innerText = "You're offline now";
        subTitle.innerText = "Internet is disconnected !";
        wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
    }
    //Appelle la fonction Ajax après 100 millisecondes
    setInterval(()=>{ //
        ajax();
    }, 100);
}
