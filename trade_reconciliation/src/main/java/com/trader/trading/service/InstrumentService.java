// src/main/java/com/trader/trading/service/InstrumentService.java
package com.trader.trading.service;

import com.trader.trading.model.Instrument;
import java.util.List;

public interface InstrumentService {
    List<Instrument> listAll();
    Instrument getById(Long id);
    Instrument create(Instrument instrument);
    Instrument update(Long id, Instrument instrument);
    void delete(Long id);
}
