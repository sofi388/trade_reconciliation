// src/main/java/com/trader/trading/service/TradeServiceImpl.java
package com.trader.trading.service;

import com.trader.trading.model.Trade;
import com.trader.trading.repository.TradeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TradeServiceImpl implements TradeService {

    private final TradeRepository repo;

    public TradeServiceImpl(TradeRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Trade> listAll() {
        return repo.findAll();
    }

    @Override
    public Trade getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Trade not found: " + id));
    }

    @Override
    public Trade create(Trade trade) {
        // no manual setId(null) needed if incoming JSON has no id
        return repo.save(trade);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
