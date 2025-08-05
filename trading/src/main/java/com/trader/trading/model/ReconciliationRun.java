package com.trader.trading.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class ReconciliationRun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate runDate;

    private String status;
    private int matchedCount;
    private int unmatchedCount;

    @OneToMany(mappedBy = "reconciliationRun", cascade = CascadeType.ALL)
    private List<ReconciliationDifference> differences;

    // Getters and Setters
}
