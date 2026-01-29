# OPD Token Allocation Engine

## Problem Overview
This project implements a token allocation system for a hospital OPD. Doctors operate in fixed time slots with limited capacity. Tokens come from multiple sources such as online booking, walk-ins, paid priority patients, follow-ups, and emergencies.

The system dynamically reallocates tokens based on priority, cancellations, no-shows, and emergency insertions.

## Assumptions
- Each doctor works in fixed 1-hour slots
- Each slot has a maximum capacity
- Priority order:
  Emergency > Paid > Follow-up > Online > Walk-in
  Higher numeric values indicate higher priority in the allocation logic.
- Emergency patients can exceed capacity by one
- No-show is marked after a fixed threshold (assumed 15 minutes)
- Data is stored in-memory for simplicity

## Core Data Models

Doctor:
- doctorId
- name

Slot:
- slotId
- doctorId
- startTime
- endTime
- maxCapacity
- tokens[]

Token:
- tokenId
- patientType
- priority
- status

## Edge Case Handling
- Cancellation promotes the next token from the waitlist (FIFO)
- Emergency tokens override normal capacity rules
- No-shows automatically free up slots
- Doctor delays can shift pending tokens to the next slot
