// src/main/java/com/trader/trading/model/Trade.java
package com.trader.trading.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "trade")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tradeId;

    @ManyToOne
    @JoinColumn(name = "instrument")
    private Instrument instrument;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer quantity;

    private String sourceSystem;

    private LocalDate tradeDate;
    // Getters and Setters

    // Getters and Setters
}
