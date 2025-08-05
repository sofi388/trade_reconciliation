// src/main/java/com/trader/trading/service/InstrumentServiceImpl.java
package com.trader.trading.service;

import com.trader.trading.model.Instrument;
import com.trader.trading.repository.InstrumentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InstrumentServiceImpl implements InstrumentService {
    private final InstrumentRepository repo;

    public InstrumentServiceImpl(InstrumentRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Instrument> listAll() {
        return repo.findAll();
    }

    @Override
    public Instrument getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrument not found: " + id));
    }

    @Override
    public Instrument create(Instrument instrument) {
        instrument.setId(null);   // ensure new
        return repo.save(instrument);
    }

    @Override
    public Instrument update(Long id, Instrument instrument) {
        Instrument existing = getById(id);
        existing.setSymbol(instrument.getSymbol());
        existing.setName(instrument.getName());
        existing.setIsin(instrument.getIsin());
        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
