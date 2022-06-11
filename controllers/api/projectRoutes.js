const router = require('express').Router();
const { Project } = require('../../models');

router.post('/', async (req, res) => {
 try {
    const newProject = await Project.create({
        ...req.body,
        user_id: req.session.user_id,
    });

    res.status(200).json(newProject);

 } catch (err) {
    res.status(400).json({ message: err.message });
 }
});

router.delete('/:id', async (req, res) => {
    try {
        const projectData = await Project.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
    },
    });

    if (!projectData) {
        res.status(404).json({ message: 'Project not found' });
        return;
    }

    res.status(200).json(projectData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;