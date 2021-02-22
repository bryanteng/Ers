import '../styles/modal.css';

const Modal = ({ showRules, handleRulesClick, children }) => {
  const showHideClassName = showRules ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div style={{display: 'flex',justifyContent:'space-between'}}>
          <h1 style={{flex: '1', alignItems:'center'}}> The Offical Rules</h1>
          <div  style={{ color : 'red', float: 'right', fontSize: '12px'}} type="button" onClick={()=> handleRulesClick}>X</div>
        </div>

        <div class="col-md-8 ">
          <h4><strong>The Pack</strong></h4>
          <p>A standard 52-card deck is used and can include Jokers.</p>
          <h4><strong>The Deal</strong></h4>
          <p>Deal cards one at a time face down, to each player until all the cards have been dealt evenly. Without looking at any of the cards, each player squares up their hand into a neat pile in front of them.</p>

          <br />

          <h4><strong>The Play</strong></h4>
          <p>Starting to the left of the dealer players pull the top card off their pile and place it face-up in the middle. If the card played is a number card, the next player puts down a card, too. This continues around the table until somebody puts down a face card or an Ace (J, Q, K, or A).</p>
          <p>When a face card or an ace is played, the next person in the sequence must play another face card or an ace in order for play to continue.</p>
          <p>If the next person in the sequence does not play a face card or an ace within their allotted chance, the person who played the last face card or an ace wins the round and the whole pile goes to them. The winner begins the next round of play.</p>
          <p>The only thing that overrides the face card or an ace rule is the slap rule. The first person to slap the pile of cards when the slap rule is put into effect is the winner of that round. If it cannot be determined who was the first to slap the pile, the person with the most fingers on top wins.</p>

          <br />

          <h4><strong>Slap Rules</strong></h4>
          <p><strong>Double –</strong> When two cards of equivalent value are laid down consecutively. Ex: 5, 5 </p>
          <p><strong>Sandwich</strong> – When two cards of equivalent value are laid down consecutively, but with one card of different value between them. Ex: 5, 7, 5</p>
          <p><strong>Top Bottom </strong> – When the same card as the first card of the set is laid down. </p>
          <p><strong>Tens </strong>– When two cards played consecutively (or with a letter card in between) add up to 10. For this rule, an ace counts as one. Ex: 3, 7 or A, K, 9 </p>
          <p><strong>Jokers –</strong> When jokers are used in the game, which should be determined before game play begins. Anytime someone lays down a joker, the pile can be slapped. </p>
          <p><strong>Four in a row</strong> – When four cards with values in consistent ascending or descending order is placed. Ex: 5, 6, 7, 8 or Q, K, A, 2 </p>
          <strong>Marriage – </strong>When a queen is placed over or under a king. Ex: Q, K or K,Q
          <p>You must add one card to the bottom of the pile if you slap the pile when it was not slappable.</p>
          <p>Continue playing even if you have run out of cards. As long as you don't slap at the wrong time, you are still allowed to "slap in" and get cards! Everyone should try to stay in the game until you have a single winner who obtains all the cards</p>
          <h4><strong>How to Keep Score</strong></h4>
          <p>The player, who has all of the cards at the end of the game, wins.</p>
        </div>
        <button type="button" onClick={()=> handleRulesClick}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal
