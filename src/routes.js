const express = require('express');
const router = express.Router();
const { allocateToken } = require('./allocator');
const { slots } = require('./data');

// POST /tokens/book
router.post('/tokens/book', (req, res) => {
  const { slotId, token } = req.body;
  
  const slot = slots.find(s => s.slotId === slotId);
  if (!slot) {
    return res.status(404).json({ error: 'Slot not found' });
  }

  const result = allocateToken(slot, token);
  res.json(result);
});

// POST /tokens/cancel
router.post('/tokens/cancel', (req, res) => {
  const { slotId, tokenId } = req.body;
  
  const slot = slots.find(s => s.slotId === slotId);
  if (!slot) {
    return res.status(404).json({ error: 'Slot not found' });
  }

  const tokenIndex = slot.tokens.findIndex(t => t.tokenId === tokenId);
  if (tokenIndex === -1) {
    return res.status(404).json({ error: 'Token not found' });
  }

  slot.tokens.splice(tokenIndex, 1);

  // Promote highest priority waitlisted token if any
  if (slot.waitlist.length > 0) {
    const promotedToken = slot.waitlist.shift();
    slot.tokens.push(promotedToken);
    res.json({ status: 'cancelled', promoted: promotedToken });
  } else {
    res.json({ status: 'cancelled' });
  }
});

// POST /tokens/emergency
router.post('/tokens/emergency', (req, res) => {
  const { slotId, token } = req.body;
  
  const slot = slots.find(s => s.slotId === slotId);
  if (!slot) {
    return res.status(404).json({ error: 'Slot not found' });
  }

  token.patientType = 'Emergency';
  const result = allocateToken(slot, token);
  res.json(result);
});

// GET /slots/:id/status
router.get('/slots/:id/status', (req, res) => {
  const { id } = req.params;
  
  const slot = slots.find(s => s.slotId === id);
  if (!slot) {
    return res.status(404).json({ error: 'Slot not found' });
  }

  res.json({
    slotId: slot.slotId,
    doctorId: slot.doctorId,
    startTime: slot.startTime,
    endTime: slot.endTime,
    maxCapacity: slot.maxCapacity,
    currentTokens: slot.tokens.length,
    tokens: slot.tokens,
    waitlistCount: slot.waitlist.length,
    waitlist: slot.waitlist
  });
});

module.exports = router;
