$(document).ready(StartPage());
function StartPage(){
	let T1 = new Typed();
	T1.create($(".text"), ["Simple typing script", "Para todo el mundo!", "Por: Damian!"], 50, 3000, 3000, true);
	T1.start();
}