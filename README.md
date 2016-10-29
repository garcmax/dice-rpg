# dice-rpg

Roll any combination of common pen&paper dice (d2/4/6/8/10/12/20/100)

###Install
npm install dice-rpg

###Usage

const dicerpg = require("dice-rpg");

dicerpg.rolled(`input`);
where `input` is a string like `d4 3d6 2d20`.
The returning object will be like :
```
{
  '4': [2],
  '6': [6,4,1],
  '20': [12,8]
}
```
