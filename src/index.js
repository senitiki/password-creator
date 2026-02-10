import './style.css';

// Word list for passphrase generation (EFF short wordlist - 1,296 words)
// Source: https://www.eff.org/files/2016/09/08/eff_short_wordlist_1.txt
const wordList = [
  'acid', 'acorn', 'acre', 'acts', 'afar', 'affix', 'aged', 'agent', 'agile', 'aging',
  'agony', 'ahead', 'aide', 'aids', 'aim', 'ajar', 'alarm', 'alias', 'alibi', 'alien',
  'alike', 'alive', 'aloe', 'aloft', 'aloha', 'alone', 'amend', 'amino', 'ample', 'amuse',
  'angel', 'anger', 'angle', 'ankle', 'apple', 'april', 'apron', 'aqua', 'area', 'arena',
  'argue', 'arise', 'armed', 'armor', 'army', 'aroma', 'array', 'arson', 'art', 'ashen',
  'ashes', 'atlas', 'atom', 'attic', 'audio', 'avert', 'avoid', 'awake', 'award', 'awoke',
  'axis', 'bacon', 'badge', 'bagel', 'baggy', 'baked', 'baker', 'balmy', 'banjo', 'barge',
  'barn', 'bash', 'basil', 'bask', 'batch', 'bath', 'baton', 'bats', 'blade', 'blank',
  'blast', 'blaze', 'bleak', 'blend', 'bless', 'blimp', 'blink', 'bloat', 'blob', 'blog',
  'blot', 'blunt', 'blurt', 'blush', 'boast', 'boat', 'body', 'boil', 'bok', 'bolt',
  'boned', 'boney', 'bonus', 'bony', 'book', 'booth', 'boots', 'boss', 'botch', 'both',
  'boxer', 'breed', 'bribe', 'brick', 'bride', 'brim', 'bring', 'brink', 'brisk', 'broad',
  'broil', 'broke', 'brook', 'broom', 'brush', 'buck', 'bud', 'buggy', 'bulge', 'bulk',
  'bully', 'bunch', 'bunny', 'bunt', 'bush', 'bust', 'busy', 'buzz', 'cable', 'cache',
  'cadet', 'cage', 'cake', 'calm', 'cameo', 'canal', 'candy', 'cane', 'canon', 'cape',
  'card', 'cargo', 'carol', 'carry', 'carve', 'case', 'cash', 'cause', 'cedar', 'chain',
  'chair', 'chant', 'chaos', 'charm', 'chase', 'cheek', 'cheer', 'chef', 'chess', 'chest',
  'chew', 'chief', 'chili', 'chill', 'chip', 'chomp', 'chop', 'chow', 'chuck', 'chump',
  'chunk', 'churn', 'chute', 'cider', 'cinch', 'city', 'civic', 'civil', 'clad', 'claim',
  'clamp', 'clap', 'clash', 'clasp', 'class', 'claw', 'clay', 'clean', 'clear', 'cleat',
  'cleft', 'clerk', 'click', 'cling', 'clink', 'clip', 'cloak', 'clock', 'clone', 'cloth',
  'cloud', 'clump', 'coach', 'coast', 'coat', 'cod', 'coil', 'coke', 'cola', 'cold',
  'colt', 'coma', 'come', 'comic', 'comma', 'cone', 'cope', 'copy', 'coral', 'cork',
  'cost', 'cot', 'couch', 'cough', 'cover', 'cozy', 'craft', 'cramp', 'crane', 'crank',
  'crate', 'crave', 'crawl', 'crazy', 'creme', 'crepe', 'crept', 'crib', 'cried', 'crisp',
  'crook', 'crop', 'cross', 'crowd', 'crown', 'crumb', 'crush', 'crust', 'cub', 'cult',
  'cupid', 'cure', 'curl', 'curry', 'curse', 'curve', 'curvy', 'cushy', 'cut', 'cycle',
  'dab', 'dad', 'daily', 'dairy', 'daisy', 'dance', 'dandy', 'darn', 'dart', 'dash',
  'data', 'date', 'dawn', 'deaf', 'deal', 'dean', 'debit', 'debt', 'debug', 'decaf',
  'decal', 'decay', 'deck', 'decor', 'decoy', 'deed', 'delay', 'denim', 'dense', 'dent',
  'depth', 'derby', 'desk', 'dial', 'diary', 'dice', 'dig', 'dill', 'dime', 'dimly',
  'diner', 'dingy', 'disco', 'dish', 'disk', 'ditch', 'ditzy', 'dizzy', 'dock', 'dodge',
  'doing', 'doll', 'dome', 'donor', 'donut', 'dose', 'dot', 'dove', 'down', 'dowry',
  'doze', 'drab', 'drama', 'drank', 'draw', 'dress', 'dried', 'drift', 'drill', 'drive',
  'drone', 'droop', 'drove', 'drown', 'drum', 'dry', 'duck', 'duct', 'dude', 'dug',
  'duke', 'duo', 'dusk', 'dust', 'duty', 'dwarf', 'dwell', 'eagle', 'early', 'earth',
  'easel', 'east', 'eaten', 'eats', 'ebay', 'ebony', 'ebook', 'echo', 'edge', 'eel',
  'eject', 'elbow', 'elder', 'elf', 'elk', 'elm', 'elope', 'elude', 'elves', 'email',
  'emit', 'empty', 'emu', 'enter', 'entry', 'envoy', 'equal', 'erase', 'error', 'erupt',
  'essay', 'etch', 'evade', 'even', 'evict', 'evil', 'evoke', 'exact', 'exit', 'fable',
  'faced', 'fact', 'fade', 'fall', 'false', 'fancy', 'fang', 'fax', 'feast', 'feed',
  'femur', 'fence', 'fend', 'ferry', 'fetal', 'fetch', 'fever', 'fiber', 'fifth', 'fifty',
  'film', 'filth', 'final', 'finch', 'fit', 'five', 'flag', 'flaky', 'flame', 'flap',
  'flask', 'fled', 'flick', 'fling', 'flint', 'flip', 'flirt', 'float', 'flock', 'flop',
  'floss', 'flyer', 'foam', 'foe', 'fog', 'foil', 'folic', 'folk', 'food', 'fool',
  'found', 'fox', 'foyer', 'frail', 'frame', 'fray', 'fresh', 'fried', 'frill', 'frisk',
  'from', 'front', 'frost', 'froth', 'frown', 'froze', 'fruit', 'gag', 'gains', 'gala',
  'game', 'gap', 'gas', 'gave', 'gear', 'gecko', 'geek', 'gem', 'genre', 'gift',
  'gig', 'gills', 'given', 'giver', 'glad', 'glass', 'glide', 'gloss', 'glove', 'glow',
  'glue', 'goal', 'going', 'golf', 'gong', 'good', 'gooey', 'goofy', 'gore', 'gown',
  'grab', 'grain', 'grant', 'grape', 'graph', 'grasp', 'grass', 'grave', 'gravy', 'gray',
  'green', 'greet', 'grew', 'grid', 'grief', 'grill', 'grip', 'grit', 'groom', 'grope',
  'growl', 'grub', 'grunt', 'guide', 'gulf', 'gulp', 'gummy', 'guru', 'gush', 'gut',
  'guy', 'habit', 'half', 'halo', 'halt', 'happy', 'harm', 'hash', 'hasty', 'hatch',
  'hate', 'haven', 'hazel', 'hazy', 'heap', 'heat', 'heave', 'hedge', 'hefty', 'help',
  'herbs', 'hers', 'hub', 'hug', 'hula', 'hull', 'human', 'humid', 'hump', 'hung',
  'hunk', 'hunt', 'hurry', 'hurt', 'hush', 'hut', 'ice', 'icing', 'icon', 'icy',
  'igloo', 'image', 'ion', 'iron', 'islam', 'issue', 'item', 'ivory', 'ivy', 'jab',
  'jam', 'jaws', 'jazz', 'jeep', 'jelly', 'jet', 'jiffy', 'job', 'jog', 'jolly',
  'jolt', 'jot', 'joy', 'judge', 'juice', 'juicy', 'july', 'jumbo', 'jump', 'junky',
  'juror', 'jury', 'keep', 'keg', 'kept', 'kick', 'kilt', 'king', 'kite', 'kitty',
  'kiwi', 'knee', 'knelt', 'koala', 'kung', 'ladle', 'lady', 'lair', 'lake', 'lance',
  'land', 'lapel', 'large', 'lash', 'lasso', 'last', 'latch', 'late', 'lazy', 'left',
  'legal', 'lemon', 'lend', 'lens', 'lent', 'level', 'lever', 'lid', 'life', 'lift',
  'lilac', 'lily', 'limb', 'limes', 'line', 'lint', 'lion', 'lip', 'list', 'lived',
  'liver', 'lunar', 'lunch', 'lung', 'lurch', 'lure', 'lurk', 'lying', 'lyric', 'mace',
  'maker', 'malt', 'mama', 'mango', 'manor', 'many', 'map', 'march', 'mardi', 'marry',
  'mash', 'match', 'mate', 'math', 'moan', 'mocha', 'moist', 'mold', 'mom', 'moody',
  'mop', 'morse', 'most', 'motor', 'motto', 'mount', 'mouse', 'mousy', 'mouth', 'move',
  'movie', 'mower', 'mud', 'mug', 'mulch', 'mule', 'mull', 'mumbo', 'mummy', 'mural',
  'muse', 'music', 'musky', 'mute', 'nacho', 'nag', 'nail', 'name', 'nanny', 'nap',
  'navy', 'near', 'neat', 'neon', 'nerd', 'nest', 'net', 'next', 'niece', 'ninth',
  'nutty', 'oak', 'oasis', 'oat', 'ocean', 'oil', 'old', 'olive', 'omen', 'onion',
  'only', 'ooze', 'opal', 'open', 'opera', 'opt', 'otter', 'ouch', 'ounce', 'outer',
  'oval', 'oven', 'owl', 'ozone', 'pace', 'pagan', 'pager', 'palm', 'panda', 'panic',
  'pants', 'panty', 'paper', 'park', 'party', 'pasta', 'patch', 'path', 'patio', 'payer',
  'pecan', 'penny', 'pep', 'perch', 'perky', 'perm', 'pest', 'petal', 'petri', 'petty',
  'photo', 'plank', 'plant', 'plaza', 'plead', 'plot', 'plow', 'pluck', 'plug', 'plus',
  'poach', 'pod', 'poem', 'poet', 'pogo', 'point', 'poise', 'poker', 'polar', 'polio',
  'polka', 'polo', 'pond', 'pony', 'poppy', 'pork', 'poser', 'pouch', 'pound', 'pout',
  'power', 'prank', 'press', 'print', 'prior', 'prism', 'prize', 'probe', 'prong', 'proof',
  'props', 'prude', 'prune', 'pry', 'pug', 'pull', 'pulp', 'pulse', 'puma', 'punch',
  'punk', 'pupil', 'puppy', 'purr', 'purse', 'push', 'putt', 'quack', 'quake', 'query',
  'quiet', 'quill', 'quilt', 'quit', 'quota', 'quote', 'rabid', 'race', 'rack', 'radar',
  'radio', 'raft', 'rage', 'raid', 'rail', 'rake', 'rally', 'ramp', 'ranch', 'range',
  'rank', 'rant', 'rash', 'raven', 'reach', 'react', 'ream', 'rebel', 'recap', 'relax',
  'relay', 'relic', 'remix', 'repay', 'repel', 'reply', 'rerun', 'reset', 'rhyme', 'rice',
  'rich', 'ride', 'rigid', 'rigor', 'rinse', 'riot', 'ripen', 'rise', 'risk', 'ritzy',
  'rival', 'river', 'roast', 'robe', 'robin', 'rock', 'rogue', 'roman', 'romp', 'rope',
  'rover', 'royal', 'ruby', 'rug', 'ruin', 'rule', 'runny', 'rush', 'rust', 'rut',
  'sadly', 'sage', 'said', 'saint', 'salad', 'salon', 'salsa', 'salt', 'same', 'sandy',
  'santa', 'satin', 'sauna', 'saved', 'savor', 'sax', 'say', 'scale', 'scam', 'scan',
  'scare', 'scarf', 'scary', 'scoff', 'scold', 'scoop', 'scoot', 'scope', 'score', 'scorn',
  'scout', 'scowl', 'scrap', 'scrub', 'scuba', 'scuff', 'sect', 'sedan', 'self', 'send',
  'sepia', 'serve', 'set', 'seven', 'shack', 'shade', 'shady', 'shaft', 'shaky', 'sham',
  'shape', 'share', 'sharp', 'shed', 'sheep', 'sheet', 'shelf', 'shell', 'shine', 'shiny',
  'ship', 'shirt', 'shock', 'shop', 'shore', 'shout', 'shove', 'shown', 'showy', 'shred',
  'shrug', 'shun', 'shush', 'shut', 'shy', 'sift', 'silk', 'silly', 'silo', 'sip',
  'siren', 'sixth', 'size', 'skate', 'skew', 'skid', 'skier', 'skies', 'skip', 'skirt',
  'skit', 'sky', 'slab', 'slack', 'slain', 'slam', 'slang', 'slash', 'slate', 'slaw',
  'sled', 'sleek', 'sleep', 'sleet', 'slept', 'slice', 'slick', 'slimy', 'sling', 'slip',
  'slit', 'slob', 'slot', 'slug', 'slum', 'slurp', 'slush', 'small', 'smash', 'smell',
  'smile', 'smirk', 'smog', 'snack', 'snap', 'snare', 'snarl', 'sneak', 'sneer', 'sniff',
  'snore', 'snort', 'snout', 'snowy', 'snub', 'snuff', 'speak', 'speed', 'spend', 'spent',
  'spew', 'spied', 'spill', 'spiny', 'spoil', 'spoke', 'spoof', 'spool', 'spoon', 'sport',
  'spot', 'spout', 'spray', 'spree', 'spur', 'squad', 'squat', 'squid', 'stack', 'staff',
  'stage', 'stain', 'stall', 'stamp', 'stand', 'stank', 'stark', 'start', 'stash', 'state',
  'stays', 'steam', 'steep', 'stem', 'step', 'stew', 'stick', 'sting', 'stir', 'stock',
  'stole', 'stomp', 'stony', 'stood', 'stool', 'stoop', 'stop', 'storm', 'stout', 'stove',
  'straw', 'stray', 'strut', 'stuck', 'stud', 'stuff', 'stump', 'stung', 'stunt', 'suds',
  'sugar', 'sulk', 'surf', 'sushi', 'swab', 'swan', 'swarm', 'sway', 'swear', 'sweat',
  'sweep', 'swell', 'swept', 'swim', 'swing', 'swipe', 'swirl', 'swoop', 'swore', 'syrup',
  'tacky', 'taco', 'tag', 'take', 'tall', 'talon', 'tamer', 'tank', 'taper', 'taps',
  'tarot', 'tart', 'task', 'taste', 'tasty', 'taunt', 'thank', 'thaw', 'theft', 'theme',
  'thigh', 'thing', 'think', 'thong', 'thorn', 'those', 'throb', 'thud', 'thumb', 'thump',
  'thus', 'tiara', 'tidal', 'tidy', 'tiger', 'tile', 'tilt', 'tint', 'tiny', 'trace',
  'track', 'trade', 'train', 'trait', 'trap', 'trash', 'tray', 'treat', 'tree', 'trek',
  'trend', 'trial', 'tribe', 'trick', 'trio', 'trout', 'truce', 'truck', 'trump', 'trunk',
  'try', 'tug', 'tulip', 'tummy', 'turf', 'tusk', 'tutor', 'tutu', 'tux', 'tweak',
  'tweet', 'twice', 'twine', 'twins', 'twirl', 'twist', 'uncle', 'uncut', 'undo', 'unify',
  'union', 'unit', 'untie', 'upon', 'upper', 'urban', 'used', 'user', 'usher', 'utter',
  'value', 'vapor', 'vegan', 'venue', 'verse', 'vest', 'veto', 'vice', 'video', 'view',
  'viral', 'virus', 'visa', 'visor', 'vixen', 'vocal', 'voice', 'void', 'volt', 'voter',
  'vowel', 'wad', 'wafer', 'wager', 'wages', 'wagon', 'wake', 'walk', 'wand', 'wasp',
  'watch', 'water', 'wavy', 'wheat', 'whiff', 'whole', 'whoop', 'wick', 'widen', 'widow',
  'width', 'wife', 'wifi', 'wilt', 'wimp', 'wind', 'wing', 'wink', 'wipe', 'wired',
  'wiry', 'wise', 'wish', 'wispy', 'wok', 'wolf', 'womb', 'wool', 'woozy', 'word',
  'work', 'worry', 'wound', 'woven', 'wrath', 'wreck', 'wrist', 'xerox', 'yahoo', 'yam',
  'yard', 'year', 'yeast', 'yelp', 'yield', 'yo-yo', 'yodel', 'yoga', 'yoyo', 'yummy',
  'zebra', 'zero', 'zesty', 'zippy', 'zone', 'zoom',
];

// Define character set
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
const numbers = '0123456789';
const symbols = '$&()*+[]@#^-_!?';

function removeSimilarChars(str) {
  return str.replace(/[0O1lI]/g, '');
}

const createBtn = document.querySelector('.create-btn');

const passwordLengthCtrl = document.getElementById('range-slider');
const passwordLength = document.getElementById('passwordLength');

const numOfPasswordsCtrl = document.getElementById('range-slider-1');
const numOfPasswords = document.getElementById('numOfPasswords');

const passwordsBody = document.querySelector('.passwords-body');

const uppercaseCtrl = document.getElementById('uppercase');
const lowercaseCtrl = document.getElementById('lowercase');
const numbersCtrl = document.getElementById('numbers');
const symbolsCtrl = document.getElementById('symbols');
const similarCtrl = document.getElementById('similar');

let uppercaseSelected = true;
let lowercaseSelected = true;
let numbersSelected = true;
let symbolsSelected = true;
let avoidSimilar = false;

let checkBoxChecked = 4;
const minimumChecked = 2;

/* eslint-disable */
function testPasswordStrength(password){
  let hasLower = false;
  let hasUpper = false;
  let hasNumber = false;
  let hasSymbol = false;
  let wordLength = password.length;
  let strength = '';

  for (let i = 0; i < wordLength; i++){
    if(/[a-z]/.test(password[i])){
      hasLower = true;
    } else if (/[A-Z]/.test(password[i])){
      hasUpper = true;
    } else if (/[0-9]/.test(password[i])){
      hasNumber = true;
    } else if (/[£$&()*+[\]@#^_!?-]/.test(password[i])){
      hasSymbol = true;
    }
  }

  if (hasLower && hasUpper && hasNumber && 
    hasSymbol && wordLength >= 12){
    strength = "Strong";
  } else if ((hasLower || hasUpper) && 
    hasSymbol && wordLength >= 6 ){
    strength = "Medium";
  } else {
    strength = "Weak";
  }

  return strength;
}

// Passphrase strength based on word count and entropy
// With 1,296-word list: ~10.3 bits per word
// 3 words = ~31 bits (Weak), 4-5 words = ~41-52 bits (Medium), 6+ words = ~62+ bits (Strong)
function testPassphraseStrength(wordCount) {
  if (wordCount >= 6) {
    return "Strong";
  } else if (wordCount >= 4) {
    return "Medium";
  } else {
    return "Weak";
  }
}

// Password generation - consolidated into single function
function generatePassword(length) {
  // Build character set based on selected options
  let chars = '';
  if (uppercaseSelected) chars += avoidSimilar ? removeSimilarChars(upperCase) : upperCase;
  if (lowercaseSelected) chars += avoidSimilar ? removeSimilarChars(lowerCase) : lowerCase;
  if (numbersSelected) chars += avoidSimilar ? removeSimilarChars(numbers) : numbers;
  if (symbolsSelected) chars += symbols; // symbols don't have similar chars
  
  // Generate password
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = 'check';
    setTimeout(() => { button.textContent = 'content_copy'; }, 2000);
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    button.textContent = 'check';
    setTimeout(() => { button.textContent = 'content_copy'; }, 2000);
  }
}

function renderPasswords(passwords){
  removeAllChildNodes(passwordsBody);

  for (let i = 0; i < passwords.length; i++){
    const row = document.createElement('div');
    row.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'gap-2', 'px-2', 'py-2');

    const passwordCreated = document.createElement('p');
    passwordCreated.textContent = passwords[i].password;
    passwordCreated.classList.add('fs-4', 'mb-0', 'font-monospace');

    // Strength badge
    const strengthBadge = document.createElement('span');
    strengthBadge.textContent = passwords[i].strength;
    strengthBadge.classList.add('badge', 'rounded-pill');

    // Color based on strength
    if (passwords[i].strength === 'Strong') {
      strengthBadge.classList.add('bg-success');
    } else if (passwords[i].strength === 'Medium') {
      strengthBadge.classList.add('bg-warning', 'text-dark');
    } else {
      strengthBadge.classList.add('bg-danger');
    }

    const copyBtn = document.createElement('i');
    copyBtn.classList.add('material-icons');
    copyBtn.textContent = 'content_copy';
    copyBtn.style.cursor = 'pointer';
    copyBtn.title = 'Copy to clipboard';
    copyBtn.addEventListener('click', () => copyToClipboard(passwords[i].password, copyBtn));

    row.appendChild(passwordCreated);
    row.appendChild(strengthBadge);
    row.appendChild(copyBtn);
    passwordsBody.appendChild(row);
  }
}

function generate() {
  if (isPassphraseMode) {
    return generatePassphrase();
  }
  const length = passwordLengthCtrl.value;
  return generatePassword(length);
}

function generateMultiple() {
  let maxNum = numOfPasswordsCtrl.value;
  
  let newPassword = '';
  let newPasswordStrength = '';
  let multiplePasswords = [];
  let i = 0;

  do {
    newPassword = generate();
    
    // Use appropriate strength test based on mode
    if (isPassphraseMode) {
      const wordCount = parseInt(wordCountSlider.value);
      newPasswordStrength = testPassphraseStrength(wordCount);
    } else {
      newPasswordStrength = testPasswordStrength(newPassword);
    }

    multiplePasswords.push({
      password: newPassword,
      strength: newPasswordStrength
    });

    i += 1;
  } while (i < maxNum);

  renderPasswords(multiplePasswords);
}

passwordLengthCtrl.addEventListener('input', (e) => {
  passwordLength.textContent = e.target.value;
});

numOfPasswordsCtrl.addEventListener('input', (e) => {
  numOfPasswords.textContent = e.target.value;
});

uppercaseCtrl.addEventListener('change', (e) => {
  if (e.target.checked) {
    checkBoxChecked += 1;
    uppercaseSelected = true;
  } else if (checkBoxChecked === minimumChecked) {
    uppercaseCtrl.checked = true;
  } else {
    checkBoxChecked -= 1;
    uppercaseSelected = false;
  }
});

lowercaseCtrl.addEventListener('change', (e) => {
  if (e.target.checked) {
    checkBoxChecked += 1;
    lowercaseSelected = true;
  } else if (checkBoxChecked === minimumChecked) {
    lowercaseCtrl.checked = true;
  } else {
    checkBoxChecked -= 1;
    lowercaseSelected = false;
  }
});

numbersCtrl.addEventListener('change', (e) => {
  if (e.target.checked) {
    checkBoxChecked += 1;
    numbersSelected = true;
  } else if (checkBoxChecked === minimumChecked) {
    numbersCtrl.checked = true;
  } else {
    checkBoxChecked -= 1;
    numbersSelected = false;
  }
});

symbolsCtrl.addEventListener('change', (e) => {
  if (e.target.checked) {
    checkBoxChecked += 1;
    symbolsSelected = true;
  } else if (checkBoxChecked === minimumChecked) {
    symbolsCtrl.checked = true;
  } else {
    checkBoxChecked -= 1;
    symbolsSelected = false;
  }
});

similarCtrl.addEventListener('change', (e) => {
  avoidSimilar = e.target.checked;
});

// Passphrase controls
const typePasswordCtrl = document.getElementById('typePassword');
const typePassphraseCtrl = document.getElementById('typePassphrase');
const passphraseWords = document.getElementById('passphraseWords');
const passphraseSeparator = document.getElementById('passphraseSeparator');
const wordCountSlider = document.getElementById('wordCountSlider');
const wordCountDisplay = document.getElementById('wordCount');
const separatorSelect = document.getElementById('separatorSelect');

let isPassphraseMode = false;

// Toggle between password and passphrase mode
const quantityLabel = document.getElementById('quantityLabel');
const resultsLabel = document.getElementById('resultsLabel');

typePasswordCtrl.addEventListener('change', () => {
  isPassphraseMode = false;
  passphraseWords.style.display = 'none';
  passphraseSeparator.style.display = 'none';
  document.querySelector('.password-length-container').style.display = '';
  document.getElementById('characters-symbols-container').style.display = '';
  quantityLabel.textContent = 'Number of passwords';
  resultsLabel.textContent = 'password list';
});

typePassphraseCtrl.addEventListener('change', () => {
  isPassphraseMode = true;
  passphraseWords.style.display = '';
  passphraseSeparator.style.display = '';
  document.querySelector('.password-length-container').style.display = 'none';
  document.getElementById('characters-symbols-container').style.display = 'none';
  quantityLabel.textContent = 'Number of passphrases';
  resultsLabel.textContent = 'passphrase list';
});

wordCountSlider.addEventListener('input', (e) => {
  wordCountDisplay.textContent = e.target.value;
});

// Generate passphrase function
function generatePassphrase() {
  const wordCount = parseInt(wordCountSlider.value);
  const separator = separatorSelect.value;
  const words = [];
  
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    words.push(wordList[randomIndex]);
  }
  
  return words.join(separator);
}

// For all screens
createBtn.addEventListener('click', () => {
  generateMultiple();
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  darkModeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
}

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Initialize theme
setTheme(getPreferredTheme());

// Toggle on click
darkModeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
