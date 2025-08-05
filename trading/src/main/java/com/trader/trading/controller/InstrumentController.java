// src/main/java/com/trader/trading/controller/InstrumentController.java
package com.trader.trading.controller;

import com.trader.trading.model.Instrument;
import com.trader.trading.service.InstrumentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/instruments")
public class InstrumentController {
    private final InstrumentService service;

    public InstrumentController(InstrumentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Instrument> getAll() {
        return service.listAll();
    }

    @GetMapping("/{id}")
    public Instrument getOne(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Instrument create(@RequestBody Instrument inst) {
        return service.create(inst);
    }

    @PutMapping("/{id}")
    public Instrument update(@PathVariable Long id, @RequestBody Instrument inst) {
        return service.update(id, inst);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
