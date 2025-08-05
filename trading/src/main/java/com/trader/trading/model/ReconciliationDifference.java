package com.trader.trading.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ReconciliationDifference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tradeId;
    private String fieldName;
    private String valueSystemA;
    private String valueSystemB;

    @ManyToOne
    @JoinColumn(name = "reconciliation_run_id")
    private ReconciliationRun reconciliationRun;

    // Getters and Setters
}
