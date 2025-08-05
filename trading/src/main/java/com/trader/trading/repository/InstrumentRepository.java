package com.trader.trading.repository;


import com.trader.trading.model.Instrument;
import org.springframework.data.jpa.repository.JpaRepository;


public interface InstrumentRepository extends JpaRepository<Instrument, Long> {
    // no extra methods needed for basic CRUD
}