package congvanservice.services;

import congvanservice.models.CongVan;
import congvanservice.repositories.CongVanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CongVanProcessor implements CongVanService {
    @Autowired
    private CongVanRepository congVanRepository;

    @Override
    public Optional<CongVan> findCongVanById(Integer id) {
        return congVanRepository.findById(id);
    }

    @Override
    public CongVan saveCongVan(CongVan congVan) {
        System.out.println("Save successfully");
        return congVanRepository.save(congVan);
    }

    @Override
    public CongVan updateCongVan(CongVan congVan) {
        System.out.println("Update successfully");
        return congVanRepository.save(congVan);

    }

    @Override
    public void deleteCongVan(Integer id) {
        System.out.println("Delete successfully");
        congVanRepository.deleteById(id);
    }

    @Override
    public List<CongVan> findAll() {
        return congVanRepository.findAll();
    }
}
