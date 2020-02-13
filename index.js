import { Decrypter } from "sec_tru_obs_aocd4";

const decrypt_util = Decrypter.new();
decrypt_util.decode_and_validate();

let encrypted = decrypt_util.encrypted_list();
let decrypted = decrypt_util.decrypted_list();

var canvas = document.querySelector("#aoc-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

let i = 0;

const renderLoop = () => {
  if (i >= decrypted.length) {
    i = 0;
  }

  draw_text(i);
  setTimeout(() => {
    requestAnimationFrame(renderLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    i += 1;
  }, 750);
};

const draw_text = i => {
  ctx.fillStyle = "ALICEBLUE";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "BLACK";
  ctx.font = "20px Ariel";
  ctx.fillText("Caesar cipher", 50, 50);

  ctx.fillStyle = "BLACK";
  ctx.font = "20px Helvetica";
  ctx.fillText("Encrypted", 50, 100);

  var encrypted_gradient = ctx.createLinearGradient(50, 50, 300, 300);
  encrypted_gradient.addColorStop(0.0, "ORANGERED");
  encrypted_gradient.addColorStop(0.5, "TOMATO");
  encrypted_gradient.addColorStop(0.75, "DEEPPINK");
  encrypted_gradient.addColorStop(1, "INDIGO");
  ctx.fillStyle = encrypted_gradient;

  ctx.font = "20px Bungee Inline";
  ctx.fillText(encrypted[i], 50, 140);

  ctx.fillStyle = "BLACK";
  ctx.font = "20px Helvetica";
  ctx.fillText("Decrypted", 50, 200);

  var decrypted_gradient = ctx.createLinearGradient(50, 50, 300, 300);
  decrypted_gradient.addColorStop(0.0, "LIGHTSEAGREEN");
  decrypted_gradient.addColorStop(0.5, "DODGERBLUE");
  decrypted_gradient.addColorStop(0.75, "ROYALBLUE");
  decrypted_gradient.addColorStop(1, "INDIGO");

  ctx.font = "40px Staatliches";
  if (decrypted[i] == "") {
    ctx.fillStyle = "RED";
    ctx.fillText("invalid code!", 70, 240);
  } else {
    ctx.fillStyle = decrypted_gradient;
    let idx = decrypted[i].lastIndexOf(" ");
    let substr = decrypted[i].slice(0, idx);
    ctx.fillText(substr, 70, 240);
  }
};

renderLoop();
